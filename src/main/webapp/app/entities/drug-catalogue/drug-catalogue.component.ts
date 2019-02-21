import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDrugCatalogue } from 'app/shared/model/drug-catalogue.model';
import { AccountService } from 'app/core';
import { DrugCatalogueService } from './drug-catalogue.service';

@Component({
    selector: 'jhi-drug-catalogue',
    templateUrl: './drug-catalogue.component.html'
})
export class DrugCatalogueComponent implements OnInit, OnDestroy {
    drugCatalogues: IDrugCatalogue[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected drugCatalogueService: DrugCatalogueService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.drugCatalogueService
            .query()
            .pipe(
                filter((res: HttpResponse<IDrugCatalogue[]>) => res.ok),
                map((res: HttpResponse<IDrugCatalogue[]>) => res.body)
            )
            .subscribe(
                (res: IDrugCatalogue[]) => {
                    this.drugCatalogues = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDrugCatalogues();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDrugCatalogue) {
        return item.id;
    }

    registerChangeInDrugCatalogues() {
        this.eventSubscriber = this.eventManager.subscribe('drugCatalogueListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
