import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVisit } from 'app/shared/model/visit.model';
import { AccountService } from 'app/core';
import { VisitService } from './visit.service';

@Component({
    selector: 'jhi-visit',
    templateUrl: './visit.component.html'
})
export class VisitComponent implements OnInit, OnDestroy {
    visits: IVisit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected visitService: VisitService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.visitService
            .query()
            .pipe(
                filter((res: HttpResponse<IVisit[]>) => res.ok),
                map((res: HttpResponse<IVisit[]>) => res.body)
            )
            .subscribe(
                (res: IVisit[]) => {
                    this.visits = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVisits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVisit) {
        return item.id;
    }

    registerChangeInVisits() {
        this.eventSubscriber = this.eventManager.subscribe('visitListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
