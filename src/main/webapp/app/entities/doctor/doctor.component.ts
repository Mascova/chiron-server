import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDoctor } from 'app/shared/model/doctor.model';
import { AccountService } from 'app/core';
import { DoctorService } from './doctor.service';

@Component({
    selector: 'jhi-doctor',
    templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit, OnDestroy {
    doctors: IDoctor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected doctorService: DoctorService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.doctorService
            .query()
            .pipe(
                filter((res: HttpResponse<IDoctor[]>) => res.ok),
                map((res: HttpResponse<IDoctor[]>) => res.body)
            )
            .subscribe(
                (res: IDoctor[]) => {
                    this.doctors = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDoctors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDoctor) {
        return item.id;
    }

    registerChangeInDoctors() {
        this.eventSubscriber = this.eventManager.subscribe('doctorListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
