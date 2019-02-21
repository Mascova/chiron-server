/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ChironServerTestModule } from '../../../test.module';
import { DrugStockDeleteDialogComponent } from 'app/entities/drug-stock/drug-stock-delete-dialog.component';
import { DrugStockService } from 'app/entities/drug-stock/drug-stock.service';

describe('Component Tests', () => {
    describe('DrugStock Management Delete Component', () => {
        let comp: DrugStockDeleteDialogComponent;
        let fixture: ComponentFixture<DrugStockDeleteDialogComponent>;
        let service: DrugStockService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [DrugStockDeleteDialogComponent]
            })
                .overrideTemplate(DrugStockDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DrugStockDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DrugStockService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
