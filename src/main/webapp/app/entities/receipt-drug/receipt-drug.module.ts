import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChironServerSharedModule } from 'app/shared';
import {
    ReceiptDrugComponent,
    ReceiptDrugDetailComponent,
    ReceiptDrugUpdateComponent,
    ReceiptDrugDeletePopupComponent,
    ReceiptDrugDeleteDialogComponent,
    receiptDrugRoute,
    receiptDrugPopupRoute
} from './';

const ENTITY_STATES = [...receiptDrugRoute, ...receiptDrugPopupRoute];

@NgModule({
    imports: [ChironServerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReceiptDrugComponent,
        ReceiptDrugDetailComponent,
        ReceiptDrugUpdateComponent,
        ReceiptDrugDeleteDialogComponent,
        ReceiptDrugDeletePopupComponent
    ],
    entryComponents: [ReceiptDrugComponent, ReceiptDrugUpdateComponent, ReceiptDrugDeleteDialogComponent, ReceiptDrugDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChironServerReceiptDrugModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
