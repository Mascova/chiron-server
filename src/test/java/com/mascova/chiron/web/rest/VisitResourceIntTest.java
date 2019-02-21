package com.mascova.chiron.web.rest;

import com.mascova.chiron.ChironServerApp;

import com.mascova.chiron.domain.Visit;
import com.mascova.chiron.repository.VisitRepository;
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
 * Test class for the VisitResource REST controller.
 *
 * @see VisitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChironServerApp.class)
public class VisitResourceIntTest {

    private static final String DEFAULT_VISIT_TIME = "AAAAAAAAAA";
    private static final String UPDATED_VISIT_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_SYMPTOMS = "AAAAAAAAAA";
    private static final String UPDATED_SYMPTOMS = "BBBBBBBBBB";

    private static final String DEFAULT_DIAGNOSE = "AAAAAAAAAA";
    private static final String UPDATED_DIAGNOSE = "BBBBBBBBBB";

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    @Autowired
    private VisitRepository visitRepository;

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

    private MockMvc restVisitMockMvc;

    private Visit visit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VisitResource visitResource = new VisitResource(visitRepository);
        this.restVisitMockMvc = MockMvcBuilders.standaloneSetup(visitResource)
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
    public static Visit createEntity(EntityManager em) {
        Visit visit = new Visit()
            .visitTime(DEFAULT_VISIT_TIME)
            .symptoms(DEFAULT_SYMPTOMS)
            .diagnose(DEFAULT_DIAGNOSE)
            .status(DEFAULT_STATUS);
        return visit;
    }

    @Before
    public void initTest() {
        visit = createEntity(em);
    }

    @Test
    @Transactional
    public void createVisit() throws Exception {
        int databaseSizeBeforeCreate = visitRepository.findAll().size();

        // Create the Visit
        restVisitMockMvc.perform(post("/api/visits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visit)))
            .andExpect(status().isCreated());

        // Validate the Visit in the database
        List<Visit> visitList = visitRepository.findAll();
        assertThat(visitList).hasSize(databaseSizeBeforeCreate + 1);
        Visit testVisit = visitList.get(visitList.size() - 1);
        assertThat(testVisit.getVisitTime()).isEqualTo(DEFAULT_VISIT_TIME);
        assertThat(testVisit.getSymptoms()).isEqualTo(DEFAULT_SYMPTOMS);
        assertThat(testVisit.getDiagnose()).isEqualTo(DEFAULT_DIAGNOSE);
        assertThat(testVisit.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createVisitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = visitRepository.findAll().size();

        // Create the Visit with an existing ID
        visit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisitMockMvc.perform(post("/api/visits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visit)))
            .andExpect(status().isBadRequest());

        // Validate the Visit in the database
        List<Visit> visitList = visitRepository.findAll();
        assertThat(visitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVisits() throws Exception {
        // Initialize the database
        visitRepository.saveAndFlush(visit);

        // Get all the visitList
        restVisitMockMvc.perform(get("/api/visits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visit.getId().intValue())))
            .andExpect(jsonPath("$.[*].visitTime").value(hasItem(DEFAULT_VISIT_TIME.toString())))
            .andExpect(jsonPath("$.[*].symptoms").value(hasItem(DEFAULT_SYMPTOMS.toString())))
            .andExpect(jsonPath("$.[*].diagnose").value(hasItem(DEFAULT_DIAGNOSE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }
    
    @Test
    @Transactional
    public void getVisit() throws Exception {
        // Initialize the database
        visitRepository.saveAndFlush(visit);

        // Get the visit
        restVisitMockMvc.perform(get("/api/visits/{id}", visit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(visit.getId().intValue()))
            .andExpect(jsonPath("$.visitTime").value(DEFAULT_VISIT_TIME.toString()))
            .andExpect(jsonPath("$.symptoms").value(DEFAULT_SYMPTOMS.toString()))
            .andExpect(jsonPath("$.diagnose").value(DEFAULT_DIAGNOSE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingVisit() throws Exception {
        // Get the visit
        restVisitMockMvc.perform(get("/api/visits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVisit() throws Exception {
        // Initialize the database
        visitRepository.saveAndFlush(visit);

        int databaseSizeBeforeUpdate = visitRepository.findAll().size();

        // Update the visit
        Visit updatedVisit = visitRepository.findById(visit.getId()).get();
        // Disconnect from session so that the updates on updatedVisit are not directly saved in db
        em.detach(updatedVisit);
        updatedVisit
            .visitTime(UPDATED_VISIT_TIME)
            .symptoms(UPDATED_SYMPTOMS)
            .diagnose(UPDATED_DIAGNOSE)
            .status(UPDATED_STATUS);

        restVisitMockMvc.perform(put("/api/visits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVisit)))
            .andExpect(status().isOk());

        // Validate the Visit in the database
        List<Visit> visitList = visitRepository.findAll();
        assertThat(visitList).hasSize(databaseSizeBeforeUpdate);
        Visit testVisit = visitList.get(visitList.size() - 1);
        assertThat(testVisit.getVisitTime()).isEqualTo(UPDATED_VISIT_TIME);
        assertThat(testVisit.getSymptoms()).isEqualTo(UPDATED_SYMPTOMS);
        assertThat(testVisit.getDiagnose()).isEqualTo(UPDATED_DIAGNOSE);
        assertThat(testVisit.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingVisit() throws Exception {
        int databaseSizeBeforeUpdate = visitRepository.findAll().size();

        // Create the Visit

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitMockMvc.perform(put("/api/visits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visit)))
            .andExpect(status().isBadRequest());

        // Validate the Visit in the database
        List<Visit> visitList = visitRepository.findAll();
        assertThat(visitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVisit() throws Exception {
        // Initialize the database
        visitRepository.saveAndFlush(visit);

        int databaseSizeBeforeDelete = visitRepository.findAll().size();

        // Delete the visit
        restVisitMockMvc.perform(delete("/api/visits/{id}", visit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Visit> visitList = visitRepository.findAll();
        assertThat(visitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Visit.class);
        Visit visit1 = new Visit();
        visit1.setId(1L);
        Visit visit2 = new Visit();
        visit2.setId(visit1.getId());
        assertThat(visit1).isEqualTo(visit2);
        visit2.setId(2L);
        assertThat(visit1).isNotEqualTo(visit2);
        visit1.setId(null);
        assertThat(visit1).isNotEqualTo(visit2);
    }
}
