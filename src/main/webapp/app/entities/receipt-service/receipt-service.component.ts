import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReceiptService } from 'app/shared/model/receipt-service.model';
import { AccountService } from 'app/core';
import { ReceiptServiceService } from './receipt-service.service';

@Component({
    selector: 'jhi-receipt-service',
    templateUrl: './receipt-service.component.html'
})
export class ReceiptServiceComponent implements OnInit, OnDestroy {
    receiptServices: IReceiptService[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected receiptServiceService: ReceiptServiceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.receiptServiceService
            .query()
            .pipe(
                filter((res: HttpResponse<IReceiptService[]>) => res.ok),
                map((res: HttpResponse<IReceiptService[]>) => res.body)
            )
            .subscribe(
                (res: IReceiptService[]) => {
                    this.receiptServices = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReceiptServices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReceiptService) {
        return item.id;
    }

    registerChangeInReceiptServices() {
        this.eventSubscriber = this.eventManager.subscribe('receiptServiceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
