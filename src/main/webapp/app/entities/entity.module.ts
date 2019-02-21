import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'patient',
                loadChildren: './patient/patient.module#ChironServerPatientModule'
            },
            {
                path: 'doctor',
                loadChildren: './doctor/doctor.module#ChironServerDoctorModule'
            },
            {
                path: 'staff',
                loadChildren: './staff/staff.module#ChironServerStaffModule'
            },
            {
                path: 'visit',
                loadChildren: './visit/visit.module#ChironServerVisitModule'
            },
            {
                path: 'service',
                loadChildren: './service/service.module#ChironServerServiceModule'
            },
            {
                path: 'receipt',
                loadChildren: './receipt/receipt.module#ChironServerReceiptModule'
            },
            {
                path: 'drug-catalogue',
                loadChildren: './drug-catalogue/drug-catalogue.module#ChironServerDrugCatalogueModule'
            },
            {
                path: 'receipt-service',
                loadChildren: './receipt-service/receipt-service.module#ChironServerReceiptServiceModule'
            },
            {
                path: 'receipt-drug',
                loadChildren: './receipt-drug/receipt-drug.module#ChironServerReceiptDrugModule'
            },
            {
                path: 'drug-stock',
                loadChildren: './drug-stock/drug-stock.module#ChironServerDrugStockModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChironServerEntityModule {}
