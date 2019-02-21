package com.mascova.chiron.repository;

import com.mascova.chiron.domain.DrugStock;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DrugStock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DrugStockRepository extends JpaRepository<DrugStock, Long> {

}
