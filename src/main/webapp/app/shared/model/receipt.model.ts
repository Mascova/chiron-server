import { Moment } from 'moment';

export interface IReceipt {
    id?: number;
    issueTime?: Moment;
}

export class Receipt implements IReceipt {
    constructor(public id?: number, public issueTime?: Moment) {}
}
