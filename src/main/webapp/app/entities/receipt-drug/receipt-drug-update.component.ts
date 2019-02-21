import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IReceiptDrug } from 'app/shared/model/receipt-drug.model';
import { ReceiptDrugService } from './receipt-drug.service';
import { IReceipt } from 'app/shared/model/receipt.model';
import { ReceiptService } from 'app/entities/receipt';
import { IDrugStock } from 'app/shared/model/drug-stock.model';
import { DrugStockService } from 'app/entities/drug-stock';

@Component({
    selector: 'jhi-receipt-drug-update',
    templateUrl: './receipt-drug-update.component.html'
})
export class ReceiptDrugUpdateComponent implements OnInit {
    receiptDrug: IReceiptDrug;
    isSaving: boolean;

    receipts: IReceipt[];

    drugstocks: IDrugStock[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected receiptDrugService: ReceiptDrugService,
        protected receiptService: ReceiptService,
        protected drugStockService: DrugStockService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receiptDrug }) => {
            this.receiptDrug = receiptDrug;
        });
        this.receiptService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IReceipt[]>) => mayBeOk.ok),
                map((response: HttpResponse<IReceipt[]>) => response.body)
            )
            .subscribe((res: IReceipt[]) => (this.receipts = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.drugStockService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDrugStock[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDrugStock[]>) => response.body)
            )
            .subscribe((res: IDrugStock[]) => (this.drugstocks = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.receiptDrug.id !== undefined) {
            this.subscribeToSaveResponse(this.receiptDrugService.update(this.receiptDrug));
        } else {
            this.subscribeToSaveResponse(this.receiptDrugService.create(this.receiptDrug));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReceiptDrug>>) {
        result.subscribe((res: HttpResponse<IReceiptDrug>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackReceiptById(index: number, item: IReceipt) {
        return item.id;
    }

    trackDrugStockById(index: number, item: IDrugStock) {
        return item.id;
    }
}
