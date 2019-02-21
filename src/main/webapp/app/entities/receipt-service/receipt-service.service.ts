import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReceiptService } from 'app/shared/model/receipt-service.model';

type EntityResponseType = HttpResponse<IReceiptService>;
type EntityArrayResponseType = HttpResponse<IReceiptService[]>;

@Injectable({ providedIn: 'root' })
export class ReceiptServiceService {
    public resourceUrl = SERVER_API_URL + 'api/receipt-services';

    constructor(protected http: HttpClient) {}

    create(receiptService: IReceiptService): Observable<EntityResponseType> {
        return this.http.post<IReceiptService>(this.resourceUrl, receiptService, { observe: 'response' });
    }

    update(receiptService: IReceiptService): Observable<EntityResponseType> {
        return this.http.put<IReceiptService>(this.resourceUrl, receiptService, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IReceiptService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReceiptService[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
