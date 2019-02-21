package com.mascova.chiron.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nik")
    private String nik;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "phone_no_1")
    private String phoneNo1;

    @Column(name = "phone_no_2")
    private String phoneNo2;

    @OneToMany(mappedBy = "patient")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Visit> visits = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNik() {
        return nik;
    }

    public Patient nik(String nik) {
        this.nik = nik;
        return this;
    }

    public void setNik(String nik) {
        this.nik = nik;
    }

    public String getName() {
        return name;
    }

    public Patient name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Patient address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getDob() {
        return dob;
    }

    public Patient dob(LocalDate dob) {
        this.dob = dob;
        return this;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getPhoneNo1() {
        return phoneNo1;
    }

    public Patient phoneNo1(String phoneNo1) {
        this.phoneNo1 = phoneNo1;
        return this;
    }

    public void setPhoneNo1(String phoneNo1) {
        this.phoneNo1 = phoneNo1;
    }

    public String getPhoneNo2() {
        return phoneNo2;
    }

    public Patient phoneNo2(String phoneNo2) {
        this.phoneNo2 = phoneNo2;
        return this;
    }

    public void setPhoneNo2(String phoneNo2) {
        this.phoneNo2 = phoneNo2;
    }

    public Set<Visit> getVisits() {
        return visits;
    }

    public Patient visits(Set<Visit> visits) {
        this.visits = visits;
        return this;
    }

    public Patient addVisit(Visit visit) {
        this.visits.add(visit);
        visit.setPatient(this);
        return this;
    }

    public Patient removeVisit(Visit visit) {
        this.visits.remove(visit);
        visit.setPatient(null);
        return this;
    }

    public void setVisits(Set<Visit> visits) {
        this.visits = visits;
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
        Patient patient = (Patient) o;
        if (patient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", nik='" + getNik() + "'" +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", dob='" + getDob() + "'" +
            ", phoneNo1='" + getPhoneNo1() + "'" +
            ", phoneNo2='" + getPhoneNo2() + "'" +
            "}";
    }
}
