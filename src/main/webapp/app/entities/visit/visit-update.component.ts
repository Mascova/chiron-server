import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IVisit } from 'app/shared/model/visit.model';
import { VisitService } from './visit.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient';

@Component({
    selector: 'jhi-visit-update',
    templateUrl: './visit-update.component.html'
})
export class VisitUpdateComponent implements OnInit {
    visit: IVisit;
    isSaving: boolean;

    patients: IPatient[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected visitService: VisitService,
        protected patientService: PatientService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ visit }) => {
            this.visit = visit;
        });
        this.patientService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPatient[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPatient[]>) => response.body)
            )
            .subscribe((res: IPatient[]) => (this.patients = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.visit.id !== undefined) {
            this.subscribeToSaveResponse(this.visitService.update(this.visit));
        } else {
            this.subscribeToSaveResponse(this.visitService.create(this.visit));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisit>>) {
        result.subscribe((res: HttpResponse<IVisit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPatientById(index: number, item: IPatient) {
        return item.id;
    }
}
