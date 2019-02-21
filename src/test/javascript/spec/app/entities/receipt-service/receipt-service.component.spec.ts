/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChironServerTestModule } from '../../../test.module';
import { ReceiptServiceComponent } from 'app/entities/receipt-service/receipt-service.component';
import { ReceiptServiceService } from 'app/entities/receipt-service/receipt-service.service';
import { ReceiptService } from 'app/shared/model/receipt-service.model';

describe('Component Tests', () => {
    describe('ReceiptService Management Component', () => {
        let comp: ReceiptServiceComponent;
        let fixture: ComponentFixture<ReceiptServiceComponent>;
        let service: ReceiptServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [ReceiptServiceComponent],
                providers: []
            })
                .overrideTemplate(ReceiptServiceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptServiceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ReceiptService(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.receiptServices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
