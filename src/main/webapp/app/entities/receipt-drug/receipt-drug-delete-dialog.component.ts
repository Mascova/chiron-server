import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReceiptDrug } from 'app/shared/model/receipt-drug.model';
import { ReceiptDrugService } from './receipt-drug.service';

@Component({
    selector: 'jhi-receipt-drug-delete-dialog',
    templateUrl: './receipt-drug-delete-dialog.component.html'
})
export class ReceiptDrugDeleteDialogComponent {
    receiptDrug: IReceiptDrug;

    constructor(
        protected receiptDrugService: ReceiptDrugService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.receiptDrugService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'receiptDrugListModification',
                content: 'Deleted an receiptDrug'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-receipt-drug-delete-popup',
    template: ''
})
export class ReceiptDrugDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receiptDrug }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReceiptDrugDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.receiptDrug = receiptDrug;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/receipt-drug', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/receipt-drug', { outlets: { popup: null } }]);
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
