import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReceiptDrug } from 'app/shared/model/receipt-drug.model';

@Component({
    selector: 'jhi-receipt-drug-detail',
    templateUrl: './receipt-drug-detail.component.html'
})
export class ReceiptDrugDetailComponent implements OnInit {
    receiptDrug: IReceiptDrug;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receiptDrug }) => {
            this.receiptDrug = receiptDrug;
        });
    }

    previousState() {
        window.history.back();
    }
}
