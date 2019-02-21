/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ChironServerTestModule } from '../../../test.module';
import { DrugCatalogueUpdateComponent } from 'app/entities/drug-catalogue/drug-catalogue-update.component';
import { DrugCatalogueService } from 'app/entities/drug-catalogue/drug-catalogue.service';
import { DrugCatalogue } from 'app/shared/model/drug-catalogue.model';

describe('Component Tests', () => {
    describe('DrugCatalogue Management Update Component', () => {
        let comp: DrugCatalogueUpdateComponent;
        let fixture: ComponentFixture<DrugCatalogueUpdateComponent>;
        let service: DrugCatalogueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [DrugCatalogueUpdateComponent]
            })
                .overrideTemplate(DrugCatalogueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DrugCatalogueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DrugCatalogueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DrugCatalogue(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.drugCatalogue = entity;
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
                    const entity = new DrugCatalogue();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.drugCatalogue = entity;
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
