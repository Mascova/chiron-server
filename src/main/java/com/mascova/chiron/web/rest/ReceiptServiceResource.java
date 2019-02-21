package com.mascova.chiron.web.rest;
import com.mascova.chiron.domain.ReceiptService;
import com.mascova.chiron.repository.ReceiptServiceRepository;
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
 * REST controller for managing ReceiptService.
 */
@RestController
@RequestMapping("/api")
public class ReceiptServiceResource {

    private final Logger log = LoggerFactory.getLogger(ReceiptServiceResource.class);

    private static final String ENTITY_NAME = "receiptService";

    private final ReceiptServiceRepository receiptServiceRepository;

    public ReceiptServiceResource(ReceiptServiceRepository receiptServiceRepository) {
        this.receiptServiceRepository = receiptServiceRepository;
    }

    /**
     * POST  /receipt-services : Create a new receiptService.
     *
     * @param receiptService the receiptService to create
     * @return the ResponseEntity with status 201 (Created) and with body the new receiptService, or with status 400 (Bad Request) if the receiptService has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/receipt-services")
    public ResponseEntity<ReceiptService> createReceiptService(@RequestBody ReceiptService receiptService) throws URISyntaxException {
        log.debug("REST request to save ReceiptService : {}", receiptService);
        if (receiptService.getId() != null) {
            throw new BadRequestAlertException("A new receiptService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReceiptService result = receiptServiceRepository.save(receiptService);
        return ResponseEntity.created(new URI("/api/receipt-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /receipt-services : Updates an existing receiptService.
     *
     * @param receiptService the receiptService to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated receiptService,
     * or with status 400 (Bad Request) if the receiptService is not valid,
     * or with status 500 (Internal Server Error) if the receiptService couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/receipt-services")
    public ResponseEntity<ReceiptService> updateReceiptService(@RequestBody ReceiptService receiptService) throws URISyntaxException {
        log.debug("REST request to update ReceiptService : {}", receiptService);
        if (receiptService.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReceiptService result = receiptServiceRepository.save(receiptService);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, receiptService.getId().toString()))
            .body(result);
    }

    /**
     * GET  /receipt-services : get all the receiptServices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of receiptServices in body
     */
    @GetMapping("/receipt-services")
    public List<ReceiptService> getAllReceiptServices() {
        log.debug("REST request to get all ReceiptServices");
        return receiptServiceRepository.findAll();
    }

    /**
     * GET  /receipt-services/:id : get the "id" receiptService.
     *
     * @param id the id of the receiptService to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the receiptService, or with status 404 (Not Found)
     */
    @GetMapping("/receipt-services/{id}")
    public ResponseEntity<ReceiptService> getReceiptService(@PathVariable Long id) {
        log.debug("REST request to get ReceiptService : {}", id);
        Optional<ReceiptService> receiptService = receiptServiceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(receiptService);
    }

    /**
     * DELETE  /receipt-services/:id : delete the "id" receiptService.
     *
     * @param id the id of the receiptService to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/receipt-services/{id}")
    public ResponseEntity<Void> deleteReceiptService(@PathVariable Long id) {
        log.debug("REST request to delete ReceiptService : {}", id);
        receiptServiceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
