package com.mascova.chiron.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DrugCatalogue.
 */
@Entity
@Table(name = "drug_catalogue")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DrugCatalogue implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "drugCatalogue")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DrugStock> drugStocks = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public DrugCatalogue name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public DrugCatalogue description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<DrugStock> getDrugStocks() {
        return drugStocks;
    }

    public DrugCatalogue drugStocks(Set<DrugStock> drugStocks) {
        this.drugStocks = drugStocks;
        return this;
    }

    public DrugCatalogue addDrugStock(DrugStock drugStock) {
        this.drugStocks.add(drugStock);
        drugStock.setDrugCatalogue(this);
        return this;
    }

    public DrugCatalogue removeDrugStock(DrugStock drugStock) {
        this.drugStocks.remove(drugStock);
        drugStock.setDrugCatalogue(null);
        return this;
    }

    public void setDrugStocks(Set<DrugStock> drugStocks) {
        this.drugStocks = drugStocks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DrugCatalogue drugCatalogue = (DrugCatalogue) o;
        if (drugCatalogue.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), drugCatalogue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DrugCatalogue{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
