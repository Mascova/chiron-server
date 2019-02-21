import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChironServerSharedModule } from 'app/shared';
import {
    ReceiptServiceComponent,
    ReceiptServiceDetailComponent,
    ReceiptServiceUpdateComponent,
    ReceiptServiceDeletePopupComponent,
    ReceiptServiceDeleteDialogComponent,
    receiptServiceRoute,
    receiptServicePopupRoute
} from './';

const ENTITY_STATES = [...receiptServiceRoute, ...receiptServicePopupRoute];

@NgModule({
    imports: [ChironServerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReceiptServiceComponent,
        ReceiptServiceDetailComponent,
        ReceiptServiceUpdateComponent,
        ReceiptServiceDeleteDialogComponent,
        ReceiptServiceDeletePopupComponent
    ],
    entryComponents: [
        ReceiptServiceComponent,
        ReceiptServiceUpdateComponent,
        ReceiptServiceDeleteDialogComponent,
        ReceiptServiceDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChironServerReceiptServiceModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
