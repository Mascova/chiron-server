import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStaff } from 'app/shared/model/staff.model';

type EntityResponseType = HttpResponse<IStaff>;
type EntityArrayResponseType = HttpResponse<IStaff[]>;

@Injectable({ providedIn: 'root' })
export class StaffService {
    public resourceUrl = SERVER_API_URL + 'api/staff';

    constructor(protected http: HttpClient) {}

    create(staff: IStaff): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(staff);
        return this.http
            .post<IStaff>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(staff: IStaff): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(staff);
        return this.http
            .put<IStaff>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStaff>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStaff[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(staff: IStaff): IStaff {
        const copy: IStaff = Object.assign({}, staff, {
            dob: staff.dob != null && staff.dob.isValid() ? staff.dob.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dob = res.body.dob != null ? moment(res.body.dob) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((staff: IStaff) => {
                staff.dob = staff.dob != null ? moment(staff.dob) : null;
            });
        }
        return res;
    }
}
