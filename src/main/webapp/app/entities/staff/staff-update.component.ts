import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';

@Component({
    selector: 'jhi-staff-update',
    templateUrl: './staff-update.component.html'
})
export class StaffUpdateComponent implements OnInit {
    staff: IStaff;
    isSaving: boolean;
    dobDp: any;

    constructor(protected staffService: StaffService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ staff }) => {
            this.staff = staff;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.staff.id !== undefined) {
            this.subscribeToSaveResponse(this.staffService.update(this.staff));
        } else {
            this.subscribeToSaveResponse(this.staffService.create(this.staff));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStaff>>) {
        result.subscribe((res: HttpResponse<IStaff>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
