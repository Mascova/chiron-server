import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChironServerSharedModule } from 'app/shared';
import {
    DrugCatalogueComponent,
    DrugCatalogueDetailComponent,
    DrugCatalogueUpdateComponent,
    DrugCatalogueDeletePopupComponent,
    DrugCatalogueDeleteDialogComponent,
    drugCatalogueRoute,
    drugCataloguePopupRoute
} from './';

const ENTITY_STATES = [...drugCatalogueRoute, ...drugCataloguePopupRoute];

@NgModule({
    imports: [ChironServerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DrugCatalogueComponent,
        DrugCatalogueDetailComponent,
        DrugCatalogueUpdateComponent,
        DrugCatalogueDeleteDialogComponent,
        DrugCatalogueDeletePopupComponent
    ],
    entryComponents: [
        DrugCatalogueComponent,
        DrugCatalogueUpdateComponent,
        DrugCatalogueDeleteDialogComponent,
        DrugCatalogueDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChironServerDrugCatalogueModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
