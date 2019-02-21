package com.mascova.chiron.web.rest;
import com.mascova.chiron.domain.DrugStock;
import com.mascova.chiron.repository.DrugStockRepository;
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
 * REST controller for managing DrugStock.
 */
@RestController
@RequestMapping("/api")
public class DrugStockResource {

    private final Logger log = LoggerFactory.getLogger(DrugStockResource.class);

    private static final String ENTITY_NAME = "drugStock";

    private final DrugStockRepository drugStockRepository;

    public DrugStockResource(DrugStockRepository drugStockRepository) {
        this.drugStockRepository = drugStockRepository;
    }

    /**
     * POST  /drug-stocks : Create a new drugStock.
     *
     * @param drugStock the drugStock to create
     * @return the ResponseEntity with status 201 (Created) and with body the new drugStock, or with status 400 (Bad Request) if the drugStock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/drug-stocks")
    public ResponseEntity<DrugStock> createDrugStock(@RequestBody DrugStock drugStock) throws URISyntaxException {
        log.debug("REST request to save DrugStock : {}", drugStock);
        if (drugStock.getId() != null) {
            throw new BadRequestAlertException("A new drugStock cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DrugStock result = drugStockRepository.save(drugStock);
        return ResponseEntity.created(new URI("/api/drug-stocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /drug-stocks : Updates an existing drugStock.
     *
     * @param drugStock the drugStock to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated drugStock,
     * or with status 400 (Bad Request) if the drugStock is not valid,
     * or with status 500 (Internal Server Error) if the drugStock couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/drug-stocks")
    public ResponseEntity<DrugStock> updateDrugStock(@RequestBody DrugStock drugStock) throws URISyntaxException {
        log.debug("REST request to update DrugStock : {}", drugStock);
        if (drugStock.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DrugStock result = drugStockRepository.save(drugStock);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, drugStock.getId().toString()))
            .body(result);
    }

    /**
     * GET  /drug-stocks : get all the drugStocks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of drugStocks in body
     */
    @GetMapping("/drug-stocks")
    public List<DrugStock> getAllDrugStocks() {
        log.debug("REST request to get all DrugStocks");
        return drugStockRepository.findAll();
    }

    /**
     * GET  /drug-stocks/:id : get the "id" drugStock.
     *
     * @param id the id of the drugStock to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the drugStock, or with status 404 (Not Found)
     */
    @GetMapping("/drug-stocks/{id}")
    public ResponseEntity<DrugStock> getDrugStock(@PathVariable Long id) {
        log.debug("REST request to get DrugStock : {}", id);
        Optional<DrugStock> drugStock = drugStockRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(drugStock);
    }

    /**
     * DELETE  /drug-stocks/:id : delete the "id" drugStock.
     *
     * @param id the id of the drugStock to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/drug-stocks/{id}")
    public ResponseEntity<Void> deleteDrugStock(@PathVariable Long id) {
        log.debug("REST request to delete DrugStock : {}", id);
        drugStockRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
