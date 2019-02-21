import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DrugStock } from 'app/shared/model/drug-stock.model';
import { DrugStockService } from './drug-stock.service';
import { DrugStockComponent } from './drug-stock.component';
import { DrugStockDetailComponent } from './drug-stock-detail.component';
import { DrugStockUpdateComponent } from './drug-stock-update.component';
import { DrugStockDeletePopupComponent } from './drug-stock-delete-dialog.component';
import { IDrugStock } from 'app/shared/model/drug-stock.model';

@Injectable({ providedIn: 'root' })
export class DrugStockResolve implements Resolve<IDrugStock> {
    constructor(private service: DrugStockService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDrugStock> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DrugStock>) => response.ok),
                map((drugStock: HttpResponse<DrugStock>) => drugStock.body)
            );
        }
        return of(new DrugStock());
    }
}

export const drugStockRoute: Routes = [
    {
        path: '',
        component: DrugStockComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DrugStockDetailComponent,
        resolve: {
            drugStock: DrugStockResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DrugStockUpdateComponent,
        resolve: {
            drugStock: DrugStockResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DrugStockUpdateComponent,
        resolve: {
            drugStock: DrugStockResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const drugStockPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DrugStockDeletePopupComponent,
        resolve: {
            drugStock: DrugStockResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugStock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
