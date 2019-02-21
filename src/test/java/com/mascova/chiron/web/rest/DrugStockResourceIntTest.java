package com.mascova.chiron.web.rest;

import com.mascova.chiron.ChironServerApp;

import com.mascova.chiron.domain.DrugStock;
import com.mascova.chiron.repository.DrugStockRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.mascova.chiron.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DrugStockResource REST controller.
 *
 * @see DrugStockResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChironServerApp.class)
public class DrugStockResourceIntTest {

    private static final LocalDate DEFAULT_BUY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BUY_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_BUY_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_BUY_PRICE = new BigDecimal(2);

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final LocalDate DEFAULT_EXPIRY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRY_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_SELL_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_SELL_PRICE = new BigDecimal(2);

    @Autowired
    private DrugStockRepository drugStockRepository;

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

    private MockMvc restDrugStockMockMvc;

    private DrugStock drugStock;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DrugStockResource drugStockResource = new DrugStockResource(drugStockRepository);
        this.restDrugStockMockMvc = MockMvcBuilders.standaloneSetup(drugStockResource)
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
    public static DrugStock createEntity(EntityManager em) {
        DrugStock drugStock = new DrugStock()
            .buyDate(DEFAULT_BUY_DATE)
            .buyPrice(DEFAULT_BUY_PRICE)
            .amount(DEFAULT_AMOUNT)
            .expiryDate(DEFAULT_EXPIRY_DATE)
            .sellPrice(DEFAULT_SELL_PRICE);
        return drugStock;
    }

    @Before
    public void initTest() {
        drugStock = createEntity(em);
    }

    @Test
    @Transactional
    public void createDrugStock() throws Exception {
        int databaseSizeBeforeCreate = drugStockRepository.findAll().size();

        // Create the DrugStock
        restDrugStockMockMvc.perform(post("/api/drug-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drugStock)))
            .andExpect(status().isCreated());

        // Validate the DrugStock in the database
        List<DrugStock> drugStockList = drugStockRepository.findAll();
        assertThat(drugStockList).hasSize(databaseSizeBeforeCreate + 1);
        DrugStock testDrugStock = drugStockList.get(drugStockList.size() - 1);
        assertThat(testDrugStock.getBuyDate()).isEqualTo(DEFAULT_BUY_DATE);
        assertThat(testDrugStock.getBuyPrice()).isEqualTo(DEFAULT_BUY_PRICE);
        assertThat(testDrugStock.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testDrugStock.getExpiryDate()).isEqualTo(DEFAULT_EXPIRY_DATE);
        assertThat(testDrugStock.getSellPrice()).isEqualTo(DEFAULT_SELL_PRICE);
    }

    @Test
    @Transactional
    public void createDrugStockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = drugStockRepository.findAll().size();

        // Create the DrugStock with an existing ID
        drugStock.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDrugStockMockMvc.perform(post("/api/drug-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drugStock)))
            .andExpect(status().isBadRequest());

        // Validate the DrugStock in the database
        List<DrugStock> drugStockList = drugStockRepository.findAll();
        assertThat(drugStockList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDrugStocks() throws Exception {
        // Initialize the database
        drugStockRepository.saveAndFlush(drugStock);

        // Get all the drugStockList
        restDrugStockMockMvc.perform(get("/api/drug-stocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(drugStock.getId().intValue())))
            .andExpect(jsonPath("$.[*].buyDate").value(hasItem(DEFAULT_BUY_DATE.toString())))
            .andExpect(jsonPath("$.[*].buyPrice").value(hasItem(DEFAULT_BUY_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].expiryDate").value(hasItem(DEFAULT_EXPIRY_DATE.toString())))
            .andExpect(jsonPath("$.[*].sellPrice").value(hasItem(DEFAULT_SELL_PRICE.intValue())));
    }
    
    @Test
    @Transactional
    public void getDrugStock() throws Exception {
        // Initialize the database
        drugStockRepository.saveAndFlush(drugStock);

        // Get the drugStock
        restDrugStockMockMvc.perform(get("/api/drug-stocks/{id}", drugStock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(drugStock.getId().intValue()))
            .andExpect(jsonPath("$.buyDate").value(DEFAULT_BUY_DATE.toString()))
            .andExpect(jsonPath("$.buyPrice").value(DEFAULT_BUY_PRICE.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.expiryDate").value(DEFAULT_EXPIRY_DATE.toString()))
            .andExpect(jsonPath("$.sellPrice").value(DEFAULT_SELL_PRICE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDrugStock() throws Exception {
        // Get the drugStock
        restDrugStockMockMvc.perform(get("/api/drug-stocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDrugStock() throws Exception {
        // Initialize the database
        drugStockRepository.saveAndFlush(drugStock);

        int databaseSizeBeforeUpdate = drugStockRepository.findAll().size();

        // Update the drugStock
        DrugStock updatedDrugStock = drugStockRepository.findById(drugStock.getId()).get();
        // Disconnect from session so that the updates on updatedDrugStock are not directly saved in db
        em.detach(updatedDrugStock);
        updatedDrugStock
            .buyDate(UPDATED_BUY_DATE)
            .buyPrice(UPDATED_BUY_PRICE)
            .amount(UPDATED_AMOUNT)
            .expiryDate(UPDATED_EXPIRY_DATE)
            .sellPrice(UPDATED_SELL_PRICE);

        restDrugStockMockMvc.perform(put("/api/drug-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDrugStock)))
            .andExpect(status().isOk());

        // Validate the DrugStock in the database
        List<DrugStock> drugStockList = drugStockRepository.findAll();
        assertThat(drugStockList).hasSize(databaseSizeBeforeUpdate);
        DrugStock testDrugStock = drugStockList.get(drugStockList.size() - 1);
        assertThat(testDrugStock.getBuyDate()).isEqualTo(UPDATED_BUY_DATE);
        assertThat(testDrugStock.getBuyPrice()).isEqualTo(UPDATED_BUY_PRICE);
        assertThat(testDrugStock.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testDrugStock.getExpiryDate()).isEqualTo(UPDATED_EXPIRY_DATE);
        assertThat(testDrugStock.getSellPrice()).isEqualTo(UPDATED_SELL_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingDrugStock() throws Exception {
        int databaseSizeBeforeUpdate = drugStockRepository.findAll().size();

        // Create the DrugStock

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDrugStockMockMvc.perform(put("/api/drug-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drugStock)))
            .andExpect(status().isBadRequest());

        // Validate the DrugStock in the database
        List<DrugStock> drugStockList = drugStockRepository.findAll();
        assertThat(drugStockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDrugStock() throws Exception {
        // Initialize the database
        drugStockRepository.saveAndFlush(drugStock);

        int databaseSizeBeforeDelete = drugStockRepository.findAll().size();

        // Delete the drugStock
        restDrugStockMockMvc.perform(delete("/api/drug-stocks/{id}", drugStock.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DrugStock> drugStockList = drugStockRepository.findAll();
        assertThat(drugStockList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DrugStock.class);
        DrugStock drugStock1 = new DrugStock();
        drugStock1.setId(1L);
        DrugStock drugStock2 = new DrugStock();
        drugStock2.setId(drugStock1.getId());
        assertThat(drugStock1).isEqualTo(drugStock2);
        drugStock2.setId(2L);
        assertThat(drugStock1).isNotEqualTo(drugStock2);
        drugStock1.setId(null);
        assertThat(drugStock1).isNotEqualTo(drugStock2);
    }
}
