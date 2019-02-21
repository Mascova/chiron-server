import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReceiptService } from 'app/shared/model/receipt-service.model';

@Component({
    selector: 'jhi-receipt-service-detail',
    templateUrl: './receipt-service-detail.component.html'
})
export class ReceiptServiceDetailComponent implements OnInit {
    receiptService: IReceiptService;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receiptService }) => {
            this.receiptService = receiptService;
        });
    }

    previousState() {
        window.history.back();
    }
}
