import { Moment } from 'moment';
import { IVisit } from 'app/shared/model/visit.model';

export interface IReceipt {
    id?: number;
    issueTime?: Moment;
    visit?: IVisit;
}

export class Receipt implements IReceipt {
    constructor(public id?: number, public issueTime?: Moment, public visit?: IVisit) {}
}
