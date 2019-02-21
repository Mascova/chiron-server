package com.mascova.chiron.web.rest;
import com.mascova.chiron.domain.DrugCatalogue;
import com.mascova.chiron.repository.DrugCatalogueRepository;
import com.mascova.chiron.web.rest.errors.BadRequestAlertException;
import com.mascova.chiron.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DrugCatalogue.
 */
@RestController
@RequestMapping("/api")
public class DrugCatalogueResource {

    private final Logger log = LoggerFactory.getLogger(DrugCatalogueResource.class);

    private static final String ENTITY_NAME = "drugCatalogue";

    private final DrugCatalogueRepository drugCatalogueRepository;

    public DrugCatalogueResource(DrugCatalogueRepository drugCatalogueRepository) {
        this.drugCatalogueRepository = drugCatalogueRepository;
    }

    /**
     * POST  /drug-catalogues : Create a new drugCatalogue.
     *
     * @param drugCatalogue the drugCatalogue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new drugCatalogue, or with status 400 (Bad Request) if the drugCatalogue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/drug-catalogues")
    public ResponseEntity<DrugCatalogue> createDrugCatalogue(@RequestBody DrugCatalogue drugCatalogue) throws URISyntaxException {
        log.debug("REST request to save DrugCatalogue : {}", drugCatalogue);
        if (drugCatalogue.getId() != null) {
            throw new BadRequestAlertException("A new drugCatalogue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DrugCatalogue result = drugCatalogueRepository.save(drugCatalogue);
        return ResponseEntity.created(new URI("/api/drug-catalogues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /drug-catalogues : Updates an existing drugCatalogue.
     *
     * @param drugCatalogue the drugCatalogue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated drugCatalogue,
     * or with status 400 (Bad Request) if the drugCatalogue is not valid,
     * or with status 500 (Internal Server Error) if the drugCatalogue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/drug-catalogues")
    public ResponseEntity<DrugCatalogue> updateDrugCatalogue(@RequestBody DrugCatalogue drugCatalogue) throws URISyntaxException {
        log.debug("REST request to update DrugCatalogue : {}", drugCatalogue);
        if (drugCatalogue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DrugCatalogue result = drugCatalogueRepository.save(drugCatalogue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, drugCatalogue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /drug-catalogues : get all the drugCatalogues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of drugCatalogues in body
     */
    @GetMapping("/drug-catalogues")
    public List<DrugCatalogue> getAllDrugCatalogues() {
        log.debug("REST request to get all DrugCatalogues");
        return drugCatalogueRepository.findAll();
    }

    /**
     * GET  /drug-catalogues/:id : get the "id" drugCatalogue.
     *
     * @param id the id of the drugCatalogue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the drugCatalogue, or with status 404 (Not Found)
     */
    @GetMapping("/drug-catalogues/{id}")
    public ResponseEntity<DrugCatalogue> getDrugCatalogue(@PathVariable Long id) {
        log.debug("REST request to get DrugCatalogue : {}", id);
        Optional<DrugCatalogue> drugCatalogue = drugCatalogueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(drugCatalogue);
    }

    /**
     * DELETE  /drug-catalogues/:id : delete the "id" drugCatalogue.
     *
     * @param id the id of the drugCatalogue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/drug-catalogues/{id}")
    public ResponseEntity<Void> deleteDrugCatalogue(@PathVariable Long id) {
        log.debug("REST request to delete DrugCatalogue : {}", id);
        drugCatalogueRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
