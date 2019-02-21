package com.mascova.chiron.web.rest;

import com.mascova.chiron.ChironServerApp;

import com.mascova.chiron.domain.DrugCatalogue;
import com.mascova.chiron.repository.DrugCatalogueRepository;
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
import java.util.List;


import static com.mascova.chiron.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DrugCatalogueResource REST controller.
 *
 * @see DrugCatalogueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChironServerApp.class)
public class DrugCatalogueResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DrugCatalogueRepository drugCatalogueRepository;

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

    private MockMvc restDrugCatalogueMockMvc;

    private DrugCatalogue drugCatalogue;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DrugCatalogueResource drugCatalogueResource = new DrugCatalogueResource(drugCatalogueRepository);
        this.restDrugCatalogueMockMvc = MockMvcBuilders.standaloneSetup(drugCatalogueResource)
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
    public static DrugCatalogue createEntity(EntityManager em) {
        DrugCatalogue drugCatalogue = new DrugCatalogue()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return drugCatalogue;
    }

    @Before
    public void initTest() {
        drugCatalogue = createEntity(em);
    }

    @Test
    @Transactional
    public void createDrugCatalogue() throws Exception {
        int databaseSizeBeforeCreate = drugCatalogueRepository.findAll().size();

        // Create the DrugCatalogue
        restDrugCatalogueMockMvc.perform(post("/api/drug-catalogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drugCatalogue)))
            .andExpect(status().isCreated());

        // Validate the DrugCatalogue in the database
        List<DrugCatalogue> drugCatalogueList = drugCatalogueRepository.findAll();
        assertThat(drugCatalogueList).hasSize(databaseSizeBeforeCreate + 1);
        DrugCatalogue testDrugCatalogue = drugCatalogueList.get(drugCatalogueList.size() - 1);
        assertThat(testDrugCatalogue.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDrugCatalogue.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createDrugCatalogueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = drugCatalogueRepository.findAll().size();

        // Create the DrugCatalogue with an existing ID
        drugCatalogue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDrugCatalogueMockMvc.perform(post("/api/drug-catalogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drugCatalogue)))
            .andExpect(status().isBadRequest());

        // Validate the DrugCatalogue in the database
        List<DrugCatalogue> drugCatalogueList = drugCatalogueRepository.findAll();
        assertThat(drugCatalogueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDrugCatalogues() throws Exception {
        // Initialize the database
        drugCatalogueRepository.saveAndFlush(drugCatalogue);

        // Get all the drugCatalogueList
        restDrugCatalogueMockMvc.perform(get("/api/drug-catalogues?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(drugCatalogue.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getDrugCatalogue() throws Exception {
        // Initialize the database
        drugCatalogueRepository.saveAndFlush(drugCatalogue);

        // Get the drugCatalogue
        restDrugCatalogueMockMvc.perform(get("/api/drug-catalogues/{id}", drugCatalogue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(drugCatalogue.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDrugCatalogue() throws Exception {
        // Get the drugCatalogue
        restDrugCatalogueMockMvc.perform(get("/api/drug-catalogues/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDrugCatalogue() throws Exception {
        // Initialize the database
        drugCatalogueRepository.saveAndFlush(drugCatalogue);

        int databaseSizeBeforeUpdate = drugCatalogueRepository.findAll().size();

        // Update the drugCatalogue
        DrugCatalogue updatedDrugCatalogue = drugCatalogueRepository.findById(drugCatalogue.getId()).get();
        // Disconnect from session so that the updates on updatedDrugCatalogue are not directly saved in db
        em.detach(updatedDrugCatalogue);
        updatedDrugCatalogue
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restDrugCatalogueMockMvc.perform(put("/api/drug-catalogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDrugCatalogue)))
            .andExpect(status().isOk());

        // Validate the DrugCatalogue in the database
        List<DrugCatalogue> drugCatalogueList = drugCatalogueRepository.findAll();
        assertThat(drugCatalogueList).hasSize(databaseSizeBeforeUpdate);
        DrugCatalogue testDrugCatalogue = drugCatalogueList.get(drugCatalogueList.size() - 1);
        assertThat(testDrugCatalogue.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDrugCatalogue.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDrugCatalogue() throws Exception {
        int databaseSizeBeforeUpdate = drugCatalogueRepository.findAll().size();

        // Create the DrugCatalogue

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDrugCatalogueMockMvc.perform(put("/api/drug-catalogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drugCatalogue)))
            .andExpect(status().isBadRequest());

        // Validate the DrugCatalogue in the database
        List<DrugCatalogue> drugCatalogueList = drugCatalogueRepository.findAll();
        assertThat(drugCatalogueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDrugCatalogue() throws Exception {
        // Initialize the database
        drugCatalogueRepository.saveAndFlush(drugCatalogue);

        int databaseSizeBeforeDelete = drugCatalogueRepository.findAll().size();

        // Delete the drugCatalogue
        restDrugCatalogueMockMvc.perform(delete("/api/drug-catalogues/{id}", drugCatalogue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DrugCatalogue> drugCatalogueList = drugCatalogueRepository.findAll();
        assertThat(drugCatalogueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DrugCatalogue.class);
        DrugCatalogue drugCatalogue1 = new DrugCatalogue();
        drugCatalogue1.setId(1L);
        DrugCatalogue drugCatalogue2 = new DrugCatalogue();
        drugCatalogue2.setId(drugCatalogue1.getId());
        assertThat(drugCatalogue1).isEqualTo(drugCatalogue2);
        drugCatalogue2.setId(2L);
        assertThat(drugCatalogue1).isNotEqualTo(drugCatalogue2);
        drugCatalogue1.setId(null);
        assertThat(drugCatalogue1).isNotEqualTo(drugCatalogue2);
    }
}
