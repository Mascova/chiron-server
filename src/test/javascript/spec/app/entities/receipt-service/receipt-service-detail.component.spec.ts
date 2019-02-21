/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChironServerTestModule } from '../../../test.module';
import { ReceiptServiceDetailComponent } from 'app/entities/receipt-service/receipt-service-detail.component';
import { ReceiptService } from 'app/shared/model/receipt-service.model';

describe('Component Tests', () => {
    describe('ReceiptService Management Detail Component', () => {
        let comp: ReceiptServiceDetailComponent;
        let fixture: ComponentFixture<ReceiptServiceDetailComponent>;
        const route = ({ data: of({ receiptService: new ReceiptService(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [ReceiptServiceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReceiptServiceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptServiceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.receiptService).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
