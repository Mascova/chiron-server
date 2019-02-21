/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ChironServerTestModule } from '../../../test.module';
import { DrugStockUpdateComponent } from 'app/entities/drug-stock/drug-stock-update.component';
import { DrugStockService } from 'app/entities/drug-stock/drug-stock.service';
import { DrugStock } from 'app/shared/model/drug-stock.model';

describe('Component Tests', () => {
    describe('DrugStock Management Update Component', () => {
        let comp: DrugStockUpdateComponent;
        let fixture: ComponentFixture<DrugStockUpdateComponent>;
        let service: DrugStockService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [DrugStockUpdateComponent]
            })
                .overrideTemplate(DrugStockUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DrugStockUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DrugStockService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DrugStock(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.drugStock = entity;
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
                    const entity = new DrugStock();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.drugStock = entity;
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
