package com.mascova.chiron.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Visit.
 */
@Entity
@Table(name = "visit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visit implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "visit_time")
    private String visitTime;

    @Column(name = "symptoms")
    private String symptoms;

    @Column(name = "diagnose")
    private String diagnose;

    @Column(name = "status")
    private Integer status;

    @ManyToOne
    @JsonIgnoreProperties("visits")
    private Patient patient;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVisitTime() {
        return visitTime;
    }

    public Visit visitTime(String visitTime) {
        this.visitTime = visitTime;
        return this;
    }

    public void setVisitTime(String visitTime) {
        this.visitTime = visitTime;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public Visit symptoms(String symptoms) {
        this.symptoms = symptoms;
        return this;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getDiagnose() {
        return diagnose;
    }

    public Visit diagnose(String diagnose) {
        this.diagnose = diagnose;
        return this;
    }

    public void setDiagnose(String diagnose) {
        this.diagnose = diagnose;
    }

    public Integer getStatus() {
        return status;
    }

    public Visit status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Patient getPatient() {
        return patient;
    }

    public Visit patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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
        Visit visit = (Visit) o;
        if (visit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Visit{" +
            "id=" + getId() +
            ", visitTime='" + getVisitTime() + "'" +
            ", symptoms='" + getSymptoms() + "'" +
            ", diagnose='" + getDiagnose() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
