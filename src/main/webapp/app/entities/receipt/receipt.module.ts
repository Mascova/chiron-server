import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChironServerSharedModule } from 'app/shared';
import {
    ReceiptComponent,
    ReceiptDetailComponent,
    ReceiptUpdateComponent,
    ReceiptDeletePopupComponent,
    ReceiptDeleteDialogComponent,
    receiptRoute,
    receiptPopupRoute
} from './';

const ENTITY_STATES = [...receiptRoute, ...receiptPopupRoute];

@NgModule({
    imports: [ChironServerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReceiptComponent,
        ReceiptDetailComponent,
        ReceiptUpdateComponent,
        ReceiptDeleteDialogComponent,
        ReceiptDeletePopupComponent
    ],
    entryComponents: [ReceiptComponent, ReceiptUpdateComponent, ReceiptDeleteDialogComponent, ReceiptDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChironServerReceiptModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
