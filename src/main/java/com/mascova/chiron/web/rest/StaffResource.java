package com.mascova.chiron.web.rest;
import com.mascova.chiron.domain.Staff;
import com.mascova.chiron.repository.StaffRepository;
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
 * REST controller for managing Staff.
 */
@RestController
@RequestMapping("/api")
public class StaffResource {

    private final Logger log = LoggerFactory.getLogger(StaffResource.class);

    private static final String ENTITY_NAME = "staff";

    private final StaffRepository staffRepository;

    public StaffResource(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    /**
     * POST  /staff : Create a new staff.
     *
     * @param staff the staff to create
     * @return the ResponseEntity with status 201 (Created) and with body the new staff, or with status 400 (Bad Request) if the staff has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/staff")
    public ResponseEntity<Staff> createStaff(@RequestBody Staff staff) throws URISyntaxException {
        log.debug("REST request to save Staff : {}", staff);
        if (staff.getId() != null) {
            throw new BadRequestAlertException("A new staff cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Staff result = staffRepository.save(staff);
        return ResponseEntity.created(new URI("/api/staff/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /staff : Updates an existing staff.
     *
     * @param staff the staff to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated staff,
     * or with status 400 (Bad Request) if the staff is not valid,
     * or with status 500 (Internal Server Error) if the staff couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/staff")
    public ResponseEntity<Staff> updateStaff(@RequestBody Staff staff) throws URISyntaxException {
        log.debug("REST request to update Staff : {}", staff);
        if (staff.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Staff result = staffRepository.save(staff);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, staff.getId().toString()))
            .body(result);
    }

    /**
     * GET  /staff : get all the staff.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of staff in body
     */
    @GetMapping("/staff")
    public List<Staff> getAllStaff() {
        log.debug("REST request to get all Staff");
        return staffRepository.findAll();
    }

    /**
     * GET  /staff/:id : get the "id" staff.
     *
     * @param id the id of the staff to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the staff, or with status 404 (Not Found)
     */
    @GetMapping("/staff/{id}")
    public ResponseEntity<Staff> getStaff(@PathVariable Long id) {
        log.debug("REST request to get Staff : {}", id);
        Optional<Staff> staff = staffRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(staff);
    }

    /**
     * DELETE  /staff/:id : delete the "id" staff.
     *
     * @param id the id of the staff to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/staff/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        log.debug("REST request to delete Staff : {}", id);
        staffRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
