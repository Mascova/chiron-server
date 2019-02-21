package com.mascova.chiron.web.rest;
import com.mascova.chiron.domain.ReceiptDrug;
import com.mascova.chiron.repository.ReceiptDrugRepository;
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
 * REST controller for managing ReceiptDrug.
 */
@RestController
@RequestMapping("/api")
public class ReceiptDrugResource {

    private final Logger log = LoggerFactory.getLogger(ReceiptDrugResource.class);

    private static final String ENTITY_NAME = "receiptDrug";

    private final ReceiptDrugRepository receiptDrugRepository;

    public ReceiptDrugResource(ReceiptDrugRepository receiptDrugRepository) {
        this.receiptDrugRepository = receiptDrugRepository;
    }

    /**
     * POST  /receipt-drugs : Create a new receiptDrug.
     *
     * @param receiptDrug the receiptDrug to create
     * @return the ResponseEntity with status 201 (Created) and with body the new receiptDrug, or with status 400 (Bad Request) if the receiptDrug has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/receipt-drugs")
    public ResponseEntity<ReceiptDrug> createReceiptDrug(@RequestBody ReceiptDrug receiptDrug) throws URISyntaxException {
        log.debug("REST request to save ReceiptDrug : {}", receiptDrug);
        if (receiptDrug.getId() != null) {
            throw new BadRequestAlertException("A new receiptDrug cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReceiptDrug result = receiptDrugRepository.save(receiptDrug);
        return ResponseEntity.created(new URI("/api/receipt-drugs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /receipt-drugs : Updates an existing receiptDrug.
     *
     * @param receiptDrug the receiptDrug to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated receiptDrug,
     * or with status 400 (Bad Request) if the receiptDrug is not valid,
     * or with status 500 (Internal Server Error) if the receiptDrug couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/receipt-drugs")
    public ResponseEntity<ReceiptDrug> updateReceiptDrug(@RequestBody ReceiptDrug receiptDrug) throws URISyntaxException {
        log.debug("REST request to update ReceiptDrug : {}", receiptDrug);
        if (receiptDrug.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReceiptDrug result = receiptDrugRepository.save(receiptDrug);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, receiptDrug.getId().toString()))
            .body(result);
    }

    /**
     * GET  /receipt-drugs : get all the receiptDrugs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of receiptDrugs in body
     */
    @GetMapping("/receipt-drugs")
    public List<ReceiptDrug> getAllReceiptDrugs() {
        log.debug("REST request to get all ReceiptDrugs");
        return receiptDrugRepository.findAll();
    }

    /**
     * GET  /receipt-drugs/:id : get the "id" receiptDrug.
     *
     * @param id the id of the receiptDrug to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the receiptDrug, or with status 404 (Not Found)
     */
    @GetMapping("/receipt-drugs/{id}")
    public ResponseEntity<ReceiptDrug> getReceiptDrug(@PathVariable Long id) {
        log.debug("REST request to get ReceiptDrug : {}", id);
        Optional<ReceiptDrug> receiptDrug = receiptDrugRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(receiptDrug);
    }

    /**
     * DELETE  /receipt-drugs/:id : delete the "id" receiptDrug.
     *
     * @param id the id of the receiptDrug to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/receipt-drugs/{id}")
    public ResponseEntity<Void> deleteReceiptDrug(@PathVariable Long id) {
        log.debug("REST request to delete ReceiptDrug : {}", id);
        receiptDrugRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
