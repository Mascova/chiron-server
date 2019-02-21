import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDrugStock } from 'app/shared/model/drug-stock.model';

type EntityResponseType = HttpResponse<IDrugStock>;
type EntityArrayResponseType = HttpResponse<IDrugStock[]>;

@Injectable({ providedIn: 'root' })
export class DrugStockService {
    public resourceUrl = SERVER_API_URL + 'api/drug-stocks';

    constructor(protected http: HttpClient) {}

    create(drugStock: IDrugStock): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(drugStock);
        return this.http
            .post<IDrugStock>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(drugStock: IDrugStock): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(drugStock);
        return this.http
            .put<IDrugStock>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDrugStock>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDrugStock[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(drugStock: IDrugStock): IDrugStock {
        const copy: IDrugStock = Object.assign({}, drugStock, {
            buyDate: drugStock.buyDate != null && drugStock.buyDate.isValid() ? drugStock.buyDate.format(DATE_FORMAT) : null,
            expiryDate: drugStock.expiryDate != null && drugStock.expiryDate.isValid() ? drugStock.expiryDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.buyDate = res.body.buyDate != null ? moment(res.body.buyDate) : null;
            res.body.expiryDate = res.body.expiryDate != null ? moment(res.body.expiryDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((drugStock: IDrugStock) => {
                drugStock.buyDate = drugStock.buyDate != null ? moment(drugStock.buyDate) : null;
                drugStock.expiryDate = drugStock.expiryDate != null ? moment(drugStock.expiryDate) : null;
            });
        }
        return res;
    }
}
