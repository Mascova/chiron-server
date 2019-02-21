/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChironServerTestModule } from '../../../test.module';
import { DrugCatalogueDetailComponent } from 'app/entities/drug-catalogue/drug-catalogue-detail.component';
import { DrugCatalogue } from 'app/shared/model/drug-catalogue.model';

describe('Component Tests', () => {
    describe('DrugCatalogue Management Detail Component', () => {
        let comp: DrugCatalogueDetailComponent;
        let fixture: ComponentFixture<DrugCatalogueDetailComponent>;
        const route = ({ data: of({ drugCatalogue: new DrugCatalogue(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [DrugCatalogueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DrugCatalogueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DrugCatalogueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.drugCatalogue).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
