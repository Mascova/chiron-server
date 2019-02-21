package com.mascova.chiron.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Receipt.
 */
@Entity
@Table(name = "receipt")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Receipt implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "issue_time")
    private Instant issueTime;

    @OneToOne
    @JoinColumn(unique = true)
    private Visit visit;

    @OneToMany(mappedBy = "receipt")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReceiptService> receiptServices = new HashSet<>();
    @OneToMany(mappedBy = "receipt")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReceiptDrug> receiptDrugs = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getIssueTime() {
        return issueTime;
    }

    public Receipt issueTime(Instant issueTime) {
        this.issueTime = issueTime;
        return this;
    }

    public void setIssueTime(Instant issueTime) {
        this.issueTime = issueTime;
    }

    public Visit getVisit() {
        return visit;
    }

    public Receipt visit(Visit visit) {
        this.visit = visit;
        return this;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }

    public Set<ReceiptService> getReceiptServices() {
        return receiptServices;
    }

    public Receipt receiptServices(Set<ReceiptService> receiptServices) {
        this.receiptServices = receiptServices;
        return this;
    }

    public Receipt addReceiptService(ReceiptService receiptService) {
        this.receiptServices.add(receiptService);
        receiptService.setReceipt(this);
        return this;
    }

    public Receipt removeReceiptService(ReceiptService receiptService) {
        this.receiptServices.remove(receiptService);
        receiptService.setReceipt(null);
        return this;
    }

    public void setReceiptServices(Set<ReceiptService> receiptServices) {
        this.receiptServices = receiptServices;
    }

    public Set<ReceiptDrug> getReceiptDrugs() {
        return receiptDrugs;
    }

    public Receipt receiptDrugs(Set<ReceiptDrug> receiptDrugs) {
        this.receiptDrugs = receiptDrugs;
        return this;
    }

    public Receipt addReceiptDrug(ReceiptDrug receiptDrug) {
        this.receiptDrugs.add(receiptDrug);
        receiptDrug.setReceipt(this);
        return this;
    }

    public Receipt removeReceiptDrug(ReceiptDrug receiptDrug) {
        this.receiptDrugs.remove(receiptDrug);
        receiptDrug.setReceipt(null);
        return this;
    }

    public void setReceiptDrugs(Set<ReceiptDrug> receiptDrugs) {
        this.receiptDrugs = receiptDrugs;
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
        Receipt receipt = (Receipt) o;
        if (receipt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), receipt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Receipt{" +
            "id=" + getId() +
            ", issueTime='" + getIssueTime() + "'" +
            "}";
    }
}
