package com.mascova.chiron.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DrugStock.
 */
@Entity
@Table(name = "drug_stock")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DrugStock implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "buy_date")
    private LocalDate buyDate;

    @Column(name = "buy_price", precision = 10, scale = 2)
    private BigDecimal buyPrice;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "sell_price", precision = 10, scale = 2)
    private BigDecimal sellPrice;

    @ManyToOne
    @JsonIgnoreProperties("drugStocks")
    private DrugCatalogue drugCatalogue;

    @OneToMany(mappedBy = "drugStock")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReceiptDrug> receiptDrugs = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBuyDate() {
        return buyDate;
    }

    public DrugStock buyDate(LocalDate buyDate) {
        this.buyDate = buyDate;
        return this;
    }

    public void setBuyDate(LocalDate buyDate) {
        this.buyDate = buyDate;
    }

    public BigDecimal getBuyPrice() {
        return buyPrice;
    }

    public DrugStock buyPrice(BigDecimal buyPrice) {
        this.buyPrice = buyPrice;
        return this;
    }

    public void setBuyPrice(BigDecimal buyPrice) {
        this.buyPrice = buyPrice;
    }

    public Integer getAmount() {
        return amount;
    }

    public DrugStock amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public DrugStock expiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
        return this;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public BigDecimal getSellPrice() {
        return sellPrice;
    }

    public DrugStock sellPrice(BigDecimal sellPrice) {
        this.sellPrice = sellPrice;
        return this;
    }

    public void setSellPrice(BigDecimal sellPrice) {
        this.sellPrice = sellPrice;
    }

    public DrugCatalogue getDrugCatalogue() {
        return drugCatalogue;
    }

    public DrugStock drugCatalogue(DrugCatalogue drugCatalogue) {
        this.drugCatalogue = drugCatalogue;
        return this;
    }

    public void setDrugCatalogue(DrugCatalogue drugCatalogue) {
        this.drugCatalogue = drugCatalogue;
    }

    public Set<ReceiptDrug> getReceiptDrugs() {
        return receiptDrugs;
    }

    public DrugStock receiptDrugs(Set<ReceiptDrug> receiptDrugs) {
        this.receiptDrugs = receiptDrugs;
        return this;
    }

    public DrugStock addReceiptDrug(ReceiptDrug receiptDrug) {
        this.receiptDrugs.add(receiptDrug);
        receiptDrug.setDrugStock(this);
        return this;
    }

    public DrugStock removeReceiptDrug(ReceiptDrug receiptDrug) {
        this.receiptDrugs.remove(receiptDrug);
        receiptDrug.setDrugStock(null);
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
        DrugStock drugStock = (DrugStock) o;
        if (drugStock.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), drugStock.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DrugStock{" +
            "id=" + getId() +
            ", buyDate='" + getBuyDate() + "'" +
            ", buyPrice=" + getBuyPrice() +
            ", amount=" + getAmount() +
            ", expiryDate='" + getExpiryDate() + "'" +
            ", sellPrice=" + getSellPrice() +
            "}";
    }
}
