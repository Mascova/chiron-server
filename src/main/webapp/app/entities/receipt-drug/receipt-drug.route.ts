import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReceiptDrug } from 'app/shared/model/receipt-drug.model';
import { ReceiptDrugService } from './receipt-drug.service';
import { ReceiptDrugComponent } from './receipt-drug.component';
import { ReceiptDrugDetailComponent } from './receipt-drug-detail.component';
import { ReceiptDrugUpdateComponent } from './receipt-drug-update.component';
import { ReceiptDrugDeletePopupComponent } from './receipt-drug-delete-dialog.component';
import { IReceiptDrug } from 'app/shared/model/receipt-drug.model';

@Injectable({ providedIn: 'root' })
export class ReceiptDrugResolve implements Resolve<IReceiptDrug> {
    constructor(private service: ReceiptDrugService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReceiptDrug> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ReceiptDrug>) => response.ok),
                map((receiptDrug: HttpResponse<ReceiptDrug>) => receiptDrug.body)
            );
        }
        return of(new ReceiptDrug());
    }
}

export const receiptDrugRoute: Routes = [
    {
        path: '',
        component: ReceiptDrugComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptDrug.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ReceiptDrugDetailComponent,
        resolve: {
            receiptDrug: ReceiptDrugResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptDrug.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ReceiptDrugUpdateComponent,
        resolve: {
            receiptDrug: ReceiptDrugResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptDrug.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ReceiptDrugUpdateComponent,
        resolve: {
            receiptDrug: ReceiptDrugResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptDrug.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receiptDrugPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ReceiptDrugDeletePopupComponent,
        resolve: {
            receiptDrug: ReceiptDrugResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptDrug.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
