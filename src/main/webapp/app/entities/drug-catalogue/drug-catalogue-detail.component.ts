import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDrugCatalogue } from 'app/shared/model/drug-catalogue.model';

@Component({
    selector: 'jhi-drug-catalogue-detail',
    templateUrl: './drug-catalogue-detail.component.html'
})
export class DrugCatalogueDetailComponent implements OnInit {
    drugCatalogue: IDrugCatalogue;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ drugCatalogue }) => {
            this.drugCatalogue = drugCatalogue;
        });
    }

    previousState() {
        window.history.back();
    }
}
