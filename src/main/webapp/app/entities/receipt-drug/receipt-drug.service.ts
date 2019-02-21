import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReceiptDrug } from 'app/shared/model/receipt-drug.model';

type EntityResponseType = HttpResponse<IReceiptDrug>;
type EntityArrayResponseType = HttpResponse<IReceiptDrug[]>;

@Injectable({ providedIn: 'root' })
export class ReceiptDrugService {
    public resourceUrl = SERVER_API_URL + 'api/receipt-drugs';

    constructor(protected http: HttpClient) {}

    create(receiptDrug: IReceiptDrug): Observable<EntityResponseType> {
        return this.http.post<IReceiptDrug>(this.resourceUrl, receiptDrug, { observe: 'response' });
    }

    update(receiptDrug: IReceiptDrug): Observable<EntityResponseType> {
        return this.http.put<IReceiptDrug>(this.resourceUrl, receiptDrug, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IReceiptDrug>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReceiptDrug[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
