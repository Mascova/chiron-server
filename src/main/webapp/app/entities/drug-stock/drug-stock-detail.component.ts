import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDrugStock } from 'app/shared/model/drug-stock.model';

@Component({
    selector: 'jhi-drug-stock-detail',
    templateUrl: './drug-stock-detail.component.html'
})
export class DrugStockDetailComponent implements OnInit {
    drugStock: IDrugStock;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ drugStock }) => {
            this.drugStock = drugStock;
        });
    }

    previousState() {
        window.history.back();
    }
}
