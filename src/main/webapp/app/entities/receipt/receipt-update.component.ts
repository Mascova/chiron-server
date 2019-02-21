import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IReceipt } from 'app/shared/model/receipt.model';
import { ReceiptService } from './receipt.service';

@Component({
    selector: 'jhi-receipt-update',
    templateUrl: './receipt-update.component.html'
})
export class ReceiptUpdateComponent implements OnInit {
    receipt: IReceipt;
    isSaving: boolean;
    issueTime: string;

    constructor(protected receiptService: ReceiptService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receipt }) => {
            this.receipt = receipt;
            this.issueTime = this.receipt.issueTime != null ? this.receipt.issueTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.receipt.issueTime = this.issueTime != null ? moment(this.issueTime, DATE_TIME_FORMAT) : null;
        if (this.receipt.id !== undefined) {
            this.subscribeToSaveResponse(this.receiptService.update(this.receipt));
        } else {
            this.subscribeToSaveResponse(this.receiptService.create(this.receipt));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReceipt>>) {
        result.subscribe((res: HttpResponse<IReceipt>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
