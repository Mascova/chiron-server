/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChironServerTestModule } from '../../../test.module';
import { ReceiptDrugComponent } from 'app/entities/receipt-drug/receipt-drug.component';
import { ReceiptDrugService } from 'app/entities/receipt-drug/receipt-drug.service';
import { ReceiptDrug } from 'app/shared/model/receipt-drug.model';

describe('Component Tests', () => {
    describe('ReceiptDrug Management Component', () => {
        let comp: ReceiptDrugComponent;
        let fixture: ComponentFixture<ReceiptDrugComponent>;
        let service: ReceiptDrugService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [ReceiptDrugComponent],
                providers: []
            })
                .overrideTemplate(ReceiptDrugComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptDrugComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptDrugService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ReceiptDrug(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.receiptDrugs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
