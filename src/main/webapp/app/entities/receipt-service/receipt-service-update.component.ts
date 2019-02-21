import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IReceiptService } from 'app/shared/model/receipt-service.model';
import { ReceiptServiceService } from './receipt-service.service';
import { IService } from 'app/shared/model/service.model';
import { ServiceService } from 'app/entities/service';
import { IReceipt } from 'app/shared/model/receipt.model';
import { ReceiptService } from 'app/entities/receipt';

@Component({
    selector: 'jhi-receipt-service-update',
    templateUrl: './receipt-service-update.component.html'
})
export class ReceiptServiceUpdateComponent implements OnInit {
    receiptService: IReceiptService;
    isSaving: boolean;

    services: IService[];

    receipts: IReceipt[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected receiptServiceService: ReceiptServiceService,
        protected serviceService: ServiceService,
        protected receiptService: ReceiptService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receiptService }) => {
            this.receiptService = receiptService;
        });
        this.serviceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IService[]>) => mayBeOk.ok),
                map((response: HttpResponse<IService[]>) => response.body)
            )
            .subscribe((res: IService[]) => (this.services = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.receiptService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IReceipt[]>) => mayBeOk.ok),
                map((response: HttpResponse<IReceipt[]>) => response.body)
            )
            .subscribe((res: IReceipt[]) => (this.receipts = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackServiceById(index: number, item: IService) {
        return item.id;
    }

    trackReceiptById(index: number, item: IReceipt) {
        return item.id;
    }
}
