import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Receipt } from 'app/shared/model/receipt.model';
import { ReceiptService } from './receipt.service';
import { ReceiptComponent } from './receipt.component';
import { ReceiptDetailComponent } from './receipt-detail.component';
import { ReceiptUpdateComponent } from './receipt-update.component';
import { ReceiptDeletePopupComponent } from './receipt-delete-dialog.component';
import { IReceipt } from 'app/shared/model/receipt.model';

@Injectable({ providedIn: 'root' })
export class ReceiptResolve implements Resolve<IReceipt> {
    constructor(private service: ReceiptService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReceipt> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Receipt>) => response.ok),
                map((receipt: HttpResponse<Receipt>) => receipt.body)
            );
        }
        return of(new Receipt());
    }
}

export const receiptRoute: Routes = [
    {
        path: '',
        component: ReceiptComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ReceiptDetailComponent,
        resolve: {
            receipt: ReceiptResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ReceiptUpdateComponent,
        resolve: {
            receipt: ReceiptResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ReceiptUpdateComponent,
        resolve: {
            receipt: ReceiptResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receiptPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ReceiptDeletePopupComponent,
        resolve: {
            receipt: ReceiptResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
