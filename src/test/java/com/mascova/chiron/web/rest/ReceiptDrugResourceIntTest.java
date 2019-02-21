package com.mascova.chiron.web.rest;

import com.mascova.chiron.ChironServerApp;

import com.mascova.chiron.domain.ReceiptDrug;
import com.mascova.chiron.repository.ReceiptDrugRepository;
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
 * Test class for the ReceiptDrugResource REST controller.
 *
 * @see ReceiptDrugResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChironServerApp.class)
public class ReceiptDrugResourceIntTest {

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    @Autowired
    private ReceiptDrugRepository receiptDrugRepository;

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

    private MockMvc restReceiptDrugMockMvc;

    private ReceiptDrug receiptDrug;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReceiptDrugResource receiptDrugResource = new ReceiptDrugResource(receiptDrugRepository);
        this.restReceiptDrugMockMvc = MockMvcBuilders.standaloneSetup(receiptDrugResource)
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
    public static ReceiptDrug createEntity(EntityManager em) {
        ReceiptDrug receiptDrug = new ReceiptDrug()
            .amount(DEFAULT_AMOUNT)
            .price(DEFAULT_PRICE);
        return receiptDrug;
    }

    @Before
    public void initTest() {
        receiptDrug = createEntity(em);
    }

    @Test
    @Transactional
    public void createReceiptDrug() throws Exception {
        int databaseSizeBeforeCreate = receiptDrugRepository.findAll().size();

        // Create the ReceiptDrug
        restReceiptDrugMockMvc.perform(post("/api/receipt-drugs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptDrug)))
            .andExpect(status().isCreated());

        // Validate the ReceiptDrug in the database
        List<ReceiptDrug> receiptDrugList = receiptDrugRepository.findAll();
        assertThat(receiptDrugList).hasSize(databaseSizeBeforeCreate + 1);
        ReceiptDrug testReceiptDrug = receiptDrugList.get(receiptDrugList.size() - 1);
        assertThat(testReceiptDrug.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testReceiptDrug.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createReceiptDrugWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receiptDrugRepository.findAll().size();

        // Create the ReceiptDrug with an existing ID
        receiptDrug.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiptDrugMockMvc.perform(post("/api/receipt-drugs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptDrug)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiptDrug in the database
        List<ReceiptDrug> receiptDrugList = receiptDrugRepository.findAll();
        assertThat(receiptDrugList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReceiptDrugs() throws Exception {
        // Initialize the database
        receiptDrugRepository.saveAndFlush(receiptDrug);

        // Get all the receiptDrugList
        restReceiptDrugMockMvc.perform(get("/api/receipt-drugs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receiptDrug.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }
    
    @Test
    @Transactional
    public void getReceiptDrug() throws Exception {
        // Initialize the database
        receiptDrugRepository.saveAndFlush(receiptDrug);

        // Get the receiptDrug
        restReceiptDrugMockMvc.perform(get("/api/receipt-drugs/{id}", receiptDrug.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(receiptDrug.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReceiptDrug() throws Exception {
        // Get the receiptDrug
        restReceiptDrugMockMvc.perform(get("/api/receipt-drugs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReceiptDrug() throws Exception {
        // Initialize the database
        receiptDrugRepository.saveAndFlush(receiptDrug);

        int databaseSizeBeforeUpdate = receiptDrugRepository.findAll().size();

        // Update the receiptDrug
        ReceiptDrug updatedReceiptDrug = receiptDrugRepository.findById(receiptDrug.getId()).get();
        // Disconnect from session so that the updates on updatedReceiptDrug are not directly saved in db
        em.detach(updatedReceiptDrug);
        updatedReceiptDrug
            .amount(UPDATED_AMOUNT)
            .price(UPDATED_PRICE);

        restReceiptDrugMockMvc.perform(put("/api/receipt-drugs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReceiptDrug)))
            .andExpect(status().isOk());

        // Validate the ReceiptDrug in the database
        List<ReceiptDrug> receiptDrugList = receiptDrugRepository.findAll();
        assertThat(receiptDrugList).hasSize(databaseSizeBeforeUpdate);
        ReceiptDrug testReceiptDrug = receiptDrugList.get(receiptDrugList.size() - 1);
        assertThat(testReceiptDrug.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testReceiptDrug.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingReceiptDrug() throws Exception {
        int databaseSizeBeforeUpdate = receiptDrugRepository.findAll().size();

        // Create the ReceiptDrug

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceiptDrugMockMvc.perform(put("/api/receipt-drugs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptDrug)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiptDrug in the database
        List<ReceiptDrug> receiptDrugList = receiptDrugRepository.findAll();
        assertThat(receiptDrugList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReceiptDrug() throws Exception {
        // Initialize the database
        receiptDrugRepository.saveAndFlush(receiptDrug);

        int databaseSizeBeforeDelete = receiptDrugRepository.findAll().size();

        // Delete the receiptDrug
        restReceiptDrugMockMvc.perform(delete("/api/receipt-drugs/{id}", receiptDrug.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReceiptDrug> receiptDrugList = receiptDrugRepository.findAll();
        assertThat(receiptDrugList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReceiptDrug.class);
        ReceiptDrug receiptDrug1 = new ReceiptDrug();
        receiptDrug1.setId(1L);
        ReceiptDrug receiptDrug2 = new ReceiptDrug();
        receiptDrug2.setId(receiptDrug1.getId());
        assertThat(receiptDrug1).isEqualTo(receiptDrug2);
        receiptDrug2.setId(2L);
        assertThat(receiptDrug1).isNotEqualTo(receiptDrug2);
        receiptDrug1.setId(null);
        assertThat(receiptDrug1).isNotEqualTo(receiptDrug2);
    }
}
