import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReceipt } from 'app/shared/model/receipt.model';
import { ReceiptService } from './receipt.service';

@Component({
    selector: 'jhi-receipt-delete-dialog',
    templateUrl: './receipt-delete-dialog.component.html'
})
export class ReceiptDeleteDialogComponent {
    receipt: IReceipt;

    constructor(protected receiptService: ReceiptService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.receiptService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'receiptListModification',
                content: 'Deleted an receipt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-receipt-delete-popup',
    template: ''
})
export class ReceiptDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receipt }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReceiptDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.receipt = receipt;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/receipt', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/receipt', { outlets: { popup: null } }]);
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
