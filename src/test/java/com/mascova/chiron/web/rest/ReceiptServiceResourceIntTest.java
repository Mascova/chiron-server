package com.mascova.chiron.web.rest;

import com.mascova.chiron.ChironServerApp;

import com.mascova.chiron.domain.ReceiptService;
import com.mascova.chiron.repository.ReceiptServiceRepository;
import com.mascova.chiron.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;


import static com.mascova.chiron.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReceiptServiceResource REST controller.
 *
 * @see ReceiptServiceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChironServerApp.class)
public class ReceiptServiceResourceIntTest {

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    @Autowired
    private ReceiptServiceRepository receiptServiceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restReceiptServiceMockMvc;

    private ReceiptService receiptService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReceiptServiceResource receiptServiceResource = new ReceiptServiceResource(receiptServiceRepository);
        this.restReceiptServiceMockMvc = MockMvcBuilders.standaloneSetup(receiptServiceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReceiptService createEntity(EntityManager em) {
        ReceiptService receiptService = new ReceiptService()
            .amount(DEFAULT_AMOUNT)
            .price(DEFAULT_PRICE);
        return receiptService;
    }

    @Before
    public void initTest() {
        receiptService = createEntity(em);
    }

    @Test
    @Transactional
    public void createReceiptService() throws Exception {
        int databaseSizeBeforeCreate = receiptServiceRepository.findAll().size();

        // Create the ReceiptService
        restReceiptServiceMockMvc.perform(post("/api/receipt-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptService)))
            .andExpect(status().isCreated());

        // Validate the ReceiptService in the database
        List<ReceiptService> receiptServiceList = receiptServiceRepository.findAll();
        assertThat(receiptServiceList).hasSize(databaseSizeBeforeCreate + 1);
        ReceiptService testReceiptService = receiptServiceList.get(receiptServiceList.size() - 1);
        assertThat(testReceiptService.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testReceiptService.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createReceiptServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receiptServiceRepository.findAll().size();

        // Create the ReceiptService with an existing ID
        receiptService.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiptServiceMockMvc.perform(post("/api/receipt-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptService)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiptService in the database
        List<ReceiptService> receiptServiceList = receiptServiceRepository.findAll();
        assertThat(receiptServiceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReceiptServices() throws Exception {
        // Initialize the database
        receiptServiceRepository.saveAndFlush(receiptService);

        // Get all the receiptServiceList
        restReceiptServiceMockMvc.perform(get("/api/receipt-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receiptService.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }
    
    @Test
    @Transactional
    public void getReceiptService() throws Exception {
        // Initialize the database
        receiptServiceRepository.saveAndFlush(receiptService);

        // Get the receiptService
        restReceiptServiceMockMvc.perform(get("/api/receipt-services/{id}", receiptService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(receiptService.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReceiptService() throws Exception {
        // Get the receiptService
        restReceiptServiceMockMvc.perform(get("/api/receipt-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReceiptService() throws Exception {
        // Initialize the database
        receiptServiceRepository.saveAndFlush(receiptService);

        int databaseSizeBeforeUpdate = receiptServiceRepository.findAll().size();

        // Update the receiptService
        ReceiptService updatedReceiptService = receiptServiceRepository.findById(receiptService.getId()).get();
        // Disconnect from session so that the updates on updatedReceiptService are not directly saved in db
        em.detach(updatedReceiptService);
        updatedReceiptService
            .amount(UPDATED_AMOUNT)
            .price(UPDATED_PRICE);

        restReceiptServiceMockMvc.perform(put("/api/receipt-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReceiptService)))
            .andExpect(status().isOk());

        // Validate the ReceiptService in the database
        List<ReceiptService> receiptServiceList = receiptServiceRepository.findAll();
        assertThat(receiptServiceList).hasSize(databaseSizeBeforeUpdate);
        ReceiptService testReceiptService = receiptServiceList.get(receiptServiceList.size() - 1);
        assertThat(testReceiptService.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testReceiptService.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingReceiptService() throws Exception {
        int databaseSizeBeforeUpdate = receiptServiceRepository.findAll().size();

        // Create the ReceiptService

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceiptServiceMockMvc.perform(put("/api/receipt-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptService)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiptService in the database
        List<ReceiptService> receiptServiceList = receiptServiceRepository.findAll();
        assertThat(receiptServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReceiptService() throws Exception {
        // Initialize the database
        receiptServiceRepository.saveAndFlush(receiptService);

        int databaseSizeBeforeDelete = receiptServiceRepository.findAll().size();

        // Delete the receiptService
        restReceiptServiceMockMvc.perform(delete("/api/receipt-services/{id}", receiptService.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReceiptService> receiptServiceList = receiptServiceRepository.findAll();
        assertThat(receiptServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReceiptService.class);
        ReceiptService receiptService1 = new ReceiptService();
        receiptService1.setId(1L);
        ReceiptService receiptService2 = new ReceiptService();
        receiptService2.setId(receiptService1.getId());
        assertThat(receiptService1).isEqualTo(receiptService2);
        receiptService2.setId(2L);
        assertThat(receiptService1).isNotEqualTo(receiptService2);
        receiptService1.setId(null);
        assertThat(receiptService1).isNotEqualTo(receiptService2);
    }
}
