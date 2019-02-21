package com.mascova.chiron.repository;

import com.mascova.chiron.domain.ReceiptDrug;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReceiptDrug entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiptDrugRepository extends JpaRepository<ReceiptDrug, Long> {

}
