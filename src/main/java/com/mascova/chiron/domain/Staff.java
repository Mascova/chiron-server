package com.mascova.chiron.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Staff.
 */
@Entity
@Table(name = "staff")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Staff implements Serializable {

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

    public Staff nik(String nik) {
        this.nik = nik;
        return this;
    }

    public void setNik(String nik) {
        this.nik = nik;
    }

    public String getName() {
        return name;
    }

    public Staff name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Staff address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getDob() {
        return dob;
    }

    public Staff dob(LocalDate dob) {
        this.dob = dob;
        return this;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getPhoneNo1() {
        return phoneNo1;
    }

    public Staff phoneNo1(String phoneNo1) {
        this.phoneNo1 = phoneNo1;
        return this;
    }

    public void setPhoneNo1(String phoneNo1) {
        this.phoneNo1 = phoneNo1;
    }

    public String getPhoneNo2() {
        return phoneNo2;
    }

    public Staff phoneNo2(String phoneNo2) {
        this.phoneNo2 = phoneNo2;
        return this;
    }

    public void setPhoneNo2(String phoneNo2) {
        this.phoneNo2 = phoneNo2;
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
        Staff staff = (Staff) o;
        if (staff.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), staff.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Staff{" +
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
