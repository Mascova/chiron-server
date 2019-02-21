import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDrugCatalogue } from 'app/shared/model/drug-catalogue.model';

type EntityResponseType = HttpResponse<IDrugCatalogue>;
type EntityArrayResponseType = HttpResponse<IDrugCatalogue[]>;

@Injectable({ providedIn: 'root' })
export class DrugCatalogueService {
    public resourceUrl = SERVER_API_URL + 'api/drug-catalogues';

    constructor(protected http: HttpClient) {}

    create(drugCatalogue: IDrugCatalogue): Observable<EntityResponseType> {
        return this.http.post<IDrugCatalogue>(this.resourceUrl, drugCatalogue, { observe: 'response' });
    }

    update(drugCatalogue: IDrugCatalogue): Observable<EntityResponseType> {
        return this.http.put<IDrugCatalogue>(this.resourceUrl, drugCatalogue, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDrugCatalogue>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDrugCatalogue[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
