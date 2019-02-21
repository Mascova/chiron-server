import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IDrugStock } from 'app/shared/model/drug-stock.model';
import { DrugStockService } from './drug-stock.service';
import { IDrugCatalogue } from 'app/shared/model/drug-catalogue.model';
import { DrugCatalogueService } from 'app/entities/drug-catalogue';

@Component({
    selector: 'jhi-drug-stock-update',
    templateUrl: './drug-stock-update.component.html'
})
export class DrugStockUpdateComponent implements OnInit {
    drugStock: IDrugStock;
    isSaving: boolean;

    drugcatalogues: IDrugCatalogue[];
    buyDateDp: any;
    expiryDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected drugStockService: DrugStockService,
        protected drugCatalogueService: DrugCatalogueService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ drugStock }) => {
            this.drugStock = drugStock;
        });
        this.drugCatalogueService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDrugCatalogue[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDrugCatalogue[]>) => response.body)
            )
            .subscribe((res: IDrugCatalogue[]) => (this.drugcatalogues = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.drugStock.id !== undefined) {
            this.subscribeToSaveResponse(this.drugStockService.update(this.drugStock));
        } else {
            this.subscribeToSaveResponse(this.drugStockService.create(this.drugStock));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDrugStock>>) {
        result.subscribe((res: HttpResponse<IDrugStock>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDrugCatalogueById(index: number, item: IDrugCatalogue) {
        return item.id;
    }
}
