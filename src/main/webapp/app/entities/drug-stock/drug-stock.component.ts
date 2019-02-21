import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDrugStock } from 'app/shared/model/drug-stock.model';
import { AccountService } from 'app/core';
import { DrugStockService } from './drug-stock.service';

@Component({
    selector: 'jhi-drug-stock',
    templateUrl: './drug-stock.component.html'
})
export class DrugStockComponent implements OnInit, OnDestroy {
    drugStocks: IDrugStock[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected drugStockService: DrugStockService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.drugStockService
            .query()
            .pipe(
                filter((res: HttpResponse<IDrugStock[]>) => res.ok),
                map((res: HttpResponse<IDrugStock[]>) => res.body)
            )
            .subscribe(
                (res: IDrugStock[]) => {
                    this.drugStocks = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDrugStocks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDrugStock) {
        return item.id;
    }

    registerChangeInDrugStocks() {
        this.eventSubscriber = this.eventManager.subscribe('drugStockListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
