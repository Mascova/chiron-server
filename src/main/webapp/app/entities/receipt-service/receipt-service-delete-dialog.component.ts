import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReceiptService } from 'app/shared/model/receipt-service.model';
import { ReceiptServiceService } from './receipt-service.service';

@Component({
    selector: 'jhi-receipt-service-delete-dialog',
    templateUrl: './receipt-service-delete-dialog.component.html'
})
export class ReceiptServiceDeleteDialogComponent {
    receiptService: IReceiptService;

    constructor(
        protected receiptServiceService: ReceiptServiceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.receiptServiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'receiptServiceListModification',
                content: 'Deleted an receiptService'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-receipt-service-delete-popup',
    template: ''
})
export class ReceiptServiceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receiptService }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReceiptServiceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.receiptService = receiptService;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/receipt-service', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/receipt-service', { outlets: { popup: null } }]);
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
