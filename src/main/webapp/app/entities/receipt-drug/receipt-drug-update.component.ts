import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IReceiptDrug } from 'app/shared/model/receipt-drug.model';
import { ReceiptDrugService } from './receipt-drug.service';

@Component({
    selector: 'jhi-receipt-drug-update',
    templateUrl: './receipt-drug-update.component.html'
})
export class ReceiptDrugUpdateComponent implements OnInit {
    receiptDrug: IReceiptDrug;
    isSaving: boolean;

    constructor(protected receiptDrugService: ReceiptDrugService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receiptDrug }) => {
            this.receiptDrug = receiptDrug;
        });
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
}
