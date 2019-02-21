import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChironServerSharedModule } from 'app/shared';
import {
    DrugStockComponent,
    DrugStockDetailComponent,
    DrugStockUpdateComponent,
    DrugStockDeletePopupComponent,
    DrugStockDeleteDialogComponent,
    drugStockRoute,
    drugStockPopupRoute
} from './';

const ENTITY_STATES = [...drugStockRoute, ...drugStockPopupRoute];

@NgModule({
    imports: [ChironServerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DrugStockComponent,
        DrugStockDetailComponent,
        DrugStockUpdateComponent,
        DrugStockDeleteDialogComponent,
        DrugStockDeletePopupComponent
    ],
    entryComponents: [DrugStockComponent, DrugStockUpdateComponent, DrugStockDeleteDialogComponent, DrugStockDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChironServerDrugStockModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
