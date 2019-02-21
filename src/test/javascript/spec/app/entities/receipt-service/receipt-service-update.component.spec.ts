/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ChironServerTestModule } from '../../../test.module';
import { ReceiptServiceUpdateComponent } from 'app/entities/receipt-service/receipt-service-update.component';
import { ReceiptServiceService } from 'app/entities/receipt-service/receipt-service.service';
import { ReceiptService } from 'app/shared/model/receipt-service.model';

describe('Component Tests', () => {
    describe('ReceiptService Management Update Component', () => {
        let comp: ReceiptServiceUpdateComponent;
        let fixture: ComponentFixture<ReceiptServiceUpdateComponent>;
        let service: ReceiptServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [ReceiptServiceUpdateComponent]
            })
                .overrideTemplate(ReceiptServiceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptServiceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptServiceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReceiptService(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receiptService = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReceiptService();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receiptService = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
