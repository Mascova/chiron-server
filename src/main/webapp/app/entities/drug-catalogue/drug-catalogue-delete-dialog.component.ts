import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDrugCatalogue } from 'app/shared/model/drug-catalogue.model';
import { DrugCatalogueService } from './drug-catalogue.service';

@Component({
    selector: 'jhi-drug-catalogue-delete-dialog',
    templateUrl: './drug-catalogue-delete-dialog.component.html'
})
export class DrugCatalogueDeleteDialogComponent {
    drugCatalogue: IDrugCatalogue;

    constructor(
        protected drugCatalogueService: DrugCatalogueService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.drugCatalogueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'drugCatalogueListModification',
                content: 'Deleted an drugCatalogue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-drug-catalogue-delete-popup',
    template: ''
})
export class DrugCatalogueDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ drugCatalogue }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DrugCatalogueDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.drugCatalogue = drugCatalogue;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/drug-catalogue', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/drug-catalogue', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
