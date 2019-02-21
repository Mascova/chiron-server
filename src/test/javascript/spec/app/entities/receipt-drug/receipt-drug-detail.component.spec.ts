/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChironServerTestModule } from '../../../test.module';
import { ReceiptDrugDetailComponent } from 'app/entities/receipt-drug/receipt-drug-detail.component';
import { ReceiptDrug } from 'app/shared/model/receipt-drug.model';

describe('Component Tests', () => {
    describe('ReceiptDrug Management Detail Component', () => {
        let comp: ReceiptDrugDetailComponent;
        let fixture: ComponentFixture<ReceiptDrugDetailComponent>;
        const route = ({ data: of({ receiptDrug: new ReceiptDrug(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [ReceiptDrugDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReceiptDrugDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptDrugDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.receiptDrug).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
