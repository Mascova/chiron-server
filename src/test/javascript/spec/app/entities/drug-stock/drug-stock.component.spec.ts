/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChironServerTestModule } from '../../../test.module';
import { DrugStockComponent } from 'app/entities/drug-stock/drug-stock.component';
import { DrugStockService } from 'app/entities/drug-stock/drug-stock.service';
import { DrugStock } from 'app/shared/model/drug-stock.model';

describe('Component Tests', () => {
    describe('DrugStock Management Component', () => {
        let comp: DrugStockComponent;
        let fixture: ComponentFixture<DrugStockComponent>;
        let service: DrugStockService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [DrugStockComponent],
                providers: []
            })
                .overrideTemplate(DrugStockComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DrugStockComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DrugStockService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DrugStock(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.drugStocks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
