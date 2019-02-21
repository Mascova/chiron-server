package com.mascova.chiron.repository;

import com.mascova.chiron.domain.ReceiptService;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReceiptService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiptServiceRepository extends JpaRepository<ReceiptService, Long> {

}
