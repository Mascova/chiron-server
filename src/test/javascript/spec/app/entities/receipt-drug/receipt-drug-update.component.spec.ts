/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ChironServerTestModule } from '../../../test.module';
import { ReceiptDrugUpdateComponent } from 'app/entities/receipt-drug/receipt-drug-update.component';
import { ReceiptDrugService } from 'app/entities/receipt-drug/receipt-drug.service';
import { ReceiptDrug } from 'app/shared/model/receipt-drug.model';

describe('Component Tests', () => {
    describe('ReceiptDrug Management Update Component', () => {
        let comp: ReceiptDrugUpdateComponent;
        let fixture: ComponentFixture<ReceiptDrugUpdateComponent>;
        let service: ReceiptDrugService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [ReceiptDrugUpdateComponent]
            })
                .overrideTemplate(ReceiptDrugUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptDrugUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptDrugService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReceiptDrug(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receiptDrug = entity;
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
                    const entity = new ReceiptDrug();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receiptDrug = entity;
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
