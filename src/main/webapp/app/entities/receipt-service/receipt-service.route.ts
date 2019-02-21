import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReceiptService } from 'app/shared/model/receipt-service.model';
import { ReceiptServiceService } from './receipt-service.service';
import { ReceiptServiceComponent } from './receipt-service.component';
import { ReceiptServiceDetailComponent } from './receipt-service-detail.component';
import { ReceiptServiceUpdateComponent } from './receipt-service-update.component';
import { ReceiptServiceDeletePopupComponent } from './receipt-service-delete-dialog.component';
import { IReceiptService } from 'app/shared/model/receipt-service.model';

@Injectable({ providedIn: 'root' })
export class ReceiptServiceResolve implements Resolve<IReceiptService> {
    constructor(private service: ReceiptServiceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReceiptService> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ReceiptService>) => response.ok),
                map((receiptService: HttpResponse<ReceiptService>) => receiptService.body)
            );
        }
        return of(new ReceiptService());
    }
}

export const receiptServiceRoute: Routes = [
    {
        path: '',
        component: ReceiptServiceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptService.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ReceiptServiceDetailComponent,
        resolve: {
            receiptService: ReceiptServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptService.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ReceiptServiceUpdateComponent,
        resolve: {
            receiptService: ReceiptServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptService.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ReceiptServiceUpdateComponent,
        resolve: {
            receiptService: ReceiptServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptService.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receiptServicePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ReceiptServiceDeletePopupComponent,
        resolve: {
            receiptService: ReceiptServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.receiptService.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
