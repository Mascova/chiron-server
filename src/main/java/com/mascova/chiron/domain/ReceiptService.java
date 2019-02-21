package com.mascova.chiron.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A ReceiptService.
 */
@Entity
@Table(name = "receipt_service")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReceiptService implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne
    @JsonIgnoreProperties("receiptServices")
    private Service service;

    @ManyToOne
    @JsonIgnoreProperties("receiptServices")
    private Receipt receipt;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return amount;
    }

    public ReceiptService amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public ReceiptService price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Service getService() {
        return service;
    }

    public ReceiptService service(Service service) {
        this.service = service;
        return this;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Receipt getReceipt() {
        return receipt;
    }

    public ReceiptService receipt(Receipt receipt) {
        this.receipt = receipt;
        return this;
    }

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
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
        ReceiptService receiptService = (ReceiptService) o;
        if (receiptService.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), receiptService.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReceiptService{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", price=" + getPrice() +
            "}";
    }
}
