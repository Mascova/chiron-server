import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDrugCatalogue } from 'app/shared/model/drug-catalogue.model';
import { DrugCatalogueService } from './drug-catalogue.service';

@Component({
    selector: 'jhi-drug-catalogue-update',
    templateUrl: './drug-catalogue-update.component.html'
})
export class DrugCatalogueUpdateComponent implements OnInit {
    drugCatalogue: IDrugCatalogue;
    isSaving: boolean;

    constructor(protected drugCatalogueService: DrugCatalogueService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ drugCatalogue }) => {
            this.drugCatalogue = drugCatalogue;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.drugCatalogue.id !== undefined) {
            this.subscribeToSaveResponse(this.drugCatalogueService.update(this.drugCatalogue));
        } else {
            this.subscribeToSaveResponse(this.drugCatalogueService.create(this.drugCatalogue));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDrugCatalogue>>) {
        result.subscribe((res: HttpResponse<IDrugCatalogue>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
