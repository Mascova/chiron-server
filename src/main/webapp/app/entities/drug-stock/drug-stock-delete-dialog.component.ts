import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDrugStock } from 'app/shared/model/drug-stock.model';
import { DrugStockService } from './drug-stock.service';

@Component({
    selector: 'jhi-drug-stock-delete-dialog',
    templateUrl: './drug-stock-delete-dialog.component.html'
})
export class DrugStockDeleteDialogComponent {
    drugStock: IDrugStock;

    constructor(
        protected drugStockService: DrugStockService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.drugStockService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'drugStockListModification',
                content: 'Deleted an drugStock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-drug-stock-delete-popup',
    template: ''
})
export class DrugStockDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ drugStock }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DrugStockDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.drugStock = drugStock;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/drug-stock', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/drug-stock', { outlets: { popup: null } }]);
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
