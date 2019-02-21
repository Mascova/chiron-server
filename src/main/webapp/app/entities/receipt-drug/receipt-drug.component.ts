import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReceiptDrug } from 'app/shared/model/receipt-drug.model';
import { AccountService } from 'app/core';
import { ReceiptDrugService } from './receipt-drug.service';

@Component({
    selector: 'jhi-receipt-drug',
    templateUrl: './receipt-drug.component.html'
})
export class ReceiptDrugComponent implements OnInit, OnDestroy {
    receiptDrugs: IReceiptDrug[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected receiptDrugService: ReceiptDrugService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.receiptDrugService
            .query()
            .pipe(
                filter((res: HttpResponse<IReceiptDrug[]>) => res.ok),
                map((res: HttpResponse<IReceiptDrug[]>) => res.body)
            )
            .subscribe(
                (res: IReceiptDrug[]) => {
                    this.receiptDrugs = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReceiptDrugs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReceiptDrug) {
        return item.id;
    }

    registerChangeInReceiptDrugs() {
        this.eventSubscriber = this.eventManager.subscribe('receiptDrugListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
