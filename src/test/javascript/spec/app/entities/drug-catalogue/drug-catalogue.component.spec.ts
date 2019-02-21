/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChironServerTestModule } from '../../../test.module';
import { DrugCatalogueComponent } from 'app/entities/drug-catalogue/drug-catalogue.component';
import { DrugCatalogueService } from 'app/entities/drug-catalogue/drug-catalogue.service';
import { DrugCatalogue } from 'app/shared/model/drug-catalogue.model';

describe('Component Tests', () => {
    describe('DrugCatalogue Management Component', () => {
        let comp: DrugCatalogueComponent;
        let fixture: ComponentFixture<DrugCatalogueComponent>;
        let service: DrugCatalogueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [DrugCatalogueComponent],
                providers: []
            })
                .overrideTemplate(DrugCatalogueComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DrugCatalogueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DrugCatalogueService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DrugCatalogue(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.drugCatalogues[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
