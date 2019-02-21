package com.mascova.chiron.repository;

import com.mascova.chiron.domain.DrugCatalogue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DrugCatalogue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DrugCatalogueRepository extends JpaRepository<DrugCatalogue, Long> {

}
