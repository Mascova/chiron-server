import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DrugCatalogue } from 'app/shared/model/drug-catalogue.model';
import { DrugCatalogueService } from './drug-catalogue.service';
import { DrugCatalogueComponent } from './drug-catalogue.component';
import { DrugCatalogueDetailComponent } from './drug-catalogue-detail.component';
import { DrugCatalogueUpdateComponent } from './drug-catalogue-update.component';
import { DrugCatalogueDeletePopupComponent } from './drug-catalogue-delete-dialog.component';
import { IDrugCatalogue } from 'app/shared/model/drug-catalogue.model';

@Injectable({ providedIn: 'root' })
export class DrugCatalogueResolve implements Resolve<IDrugCatalogue> {
    constructor(private service: DrugCatalogueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDrugCatalogue> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DrugCatalogue>) => response.ok),
                map((drugCatalogue: HttpResponse<DrugCatalogue>) => drugCatalogue.body)
            );
        }
        return of(new DrugCatalogue());
    }
}

export const drugCatalogueRoute: Routes = [
    {
        path: '',
        component: DrugCatalogueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugCatalogue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DrugCatalogueDetailComponent,
        resolve: {
            drugCatalogue: DrugCatalogueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugCatalogue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DrugCatalogueUpdateComponent,
        resolve: {
            drugCatalogue: DrugCatalogueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugCatalogue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DrugCatalogueUpdateComponent,
        resolve: {
            drugCatalogue: DrugCatalogueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugCatalogue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const drugCataloguePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DrugCatalogueDeletePopupComponent,
        resolve: {
            drugCatalogue: DrugCatalogueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chironServerApp.drugCatalogue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
