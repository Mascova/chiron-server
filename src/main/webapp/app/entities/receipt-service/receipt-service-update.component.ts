import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IReceiptService } from 'app/shared/model/receipt-service.model';
import { ReceiptServiceService } from './receipt-service.service';

@Component({
    selector: 'jhi-receipt-service-update',
    templateUrl: './receipt-service-update.component.html'
})
export class ReceiptServiceUpdateComponent implements OnInit {
    receiptService: IReceiptService;
    isSaving: boolean;

    constructor(protected receiptServiceService: ReceiptServiceService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receiptService }) => {
            this.receiptService = receiptService;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.receiptService.id !== undefined) {
            this.subscribeToSaveResponse(this.receiptServiceService.update(this.receiptService));
        } else {
            this.subscribeToSaveResponse(this.receiptServiceService.create(this.receiptService));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReceiptService>>) {
        result.subscribe((res: HttpResponse<IReceiptService>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
