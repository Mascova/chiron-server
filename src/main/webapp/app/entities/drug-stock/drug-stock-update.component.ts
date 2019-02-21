import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { IDrugStock } from 'app/shared/model/drug-stock.model';
import { DrugStockService } from './drug-stock.service';

@Component({
    selector: 'jhi-drug-stock-update',
    templateUrl: './drug-stock-update.component.html'
})
export class DrugStockUpdateComponent implements OnInit {
    drugStock: IDrugStock;
    isSaving: boolean;
    buyDateDp: any;
    expiryDateDp: any;

    constructor(protected drugStockService: DrugStockService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ drugStock }) => {
            this.drugStock = drugStock;
        });
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
}
