/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ChironServerTestModule } from '../../../test.module';
import { DrugCatalogueDeleteDialogComponent } from 'app/entities/drug-catalogue/drug-catalogue-delete-dialog.component';
import { DrugCatalogueService } from 'app/entities/drug-catalogue/drug-catalogue.service';

describe('Component Tests', () => {
    describe('DrugCatalogue Management Delete Component', () => {
        let comp: DrugCatalogueDeleteDialogComponent;
        let fixture: ComponentFixture<DrugCatalogueDeleteDialogComponent>;
        let service: DrugCatalogueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChironServerTestModule],
                declarations: [DrugCatalogueDeleteDialogComponent]
            })
                .overrideTemplate(DrugCatalogueDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DrugCatalogueDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DrugCatalogueService);
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
