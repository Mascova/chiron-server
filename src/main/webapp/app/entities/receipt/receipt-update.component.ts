import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IReceipt } from 'app/shared/model/receipt.model';
import { ReceiptService } from './receipt.service';
import { IVisit } from 'app/shared/model/visit.model';
import { VisitService } from 'app/entities/visit';

@Component({
    selector: 'jhi-receipt-update',
    templateUrl: './receipt-update.component.html'
})
export class ReceiptUpdateComponent implements OnInit {
    receipt: IReceipt;
    isSaving: boolean;

    visits: IVisit[];
    issueTime: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected receiptService: ReceiptService,
        protected visitService: VisitService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receipt }) => {
            this.receipt = receipt;
            this.issueTime = this.receipt.issueTime != null ? this.receipt.issueTime.format(DATE_TIME_FORMAT) : null;
        });
        this.visitService
            .query({ filter: 'receipt-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IVisit[]>) => mayBeOk.ok),
                map((response: HttpResponse<IVisit[]>) => response.body)
            )
            .subscribe(
                (res: IVisit[]) => {
                    if (!this.receipt.visit || !this.receipt.visit.id) {
                        this.visits = res;
                    } else {
                        this.visitService
                            .find(this.receipt.visit.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IVisit>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IVisit>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IVisit) => (this.visits = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackVisitById(index: number, item: IVisit) {
        return item.id;
    }
}
