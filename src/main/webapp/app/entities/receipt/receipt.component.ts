import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReceipt } from 'app/shared/model/receipt.model';
import { AccountService } from 'app/core';
import { ReceiptService } from './receipt.service';

@Component({
    selector: 'jhi-receipt',
    templateUrl: './receipt.component.html'
})
export class ReceiptComponent implements OnInit, OnDestroy {
    receipts: IReceipt[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected receiptService: ReceiptService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.receiptService
            .query()
            .pipe(
                filter((res: HttpResponse<IReceipt[]>) => res.ok),
                map((res: HttpResponse<IReceipt[]>) => res.body)
            )
            .subscribe(
                (res: IReceipt[]) => {
                    this.receipts = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReceipts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReceipt) {
        return item.id;
    }

    registerChangeInReceipts() {
        this.eventSubscriber = this.eventManager.subscribe('receiptListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
