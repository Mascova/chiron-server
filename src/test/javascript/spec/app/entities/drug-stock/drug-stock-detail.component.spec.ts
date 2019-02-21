/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChironServerTestModule } from '../../../test.module';
import { DrugStockDetailComponent } from 'app/entities/drug-stock/drug-stock-detail.component';
import { DrugStock } from 'app/shared/model/drug-stock.model';

describe('Component Tests', () => {
    describe('DrugStock Management Detail Component', () => {
        let comp: DrugStockDetailComponent;
        let fixture: ComponentFixture<DrugStockDetailComponent>;
        const route = ({ data: of({ drugStock: new DrugStock(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [DrugStockDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DrugStockDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DrugStockDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.drugStock).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
