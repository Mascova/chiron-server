import { Moment } from 'moment';
import { IVisit } from 'app/shared/model/visit.model';
import { IReceiptService } from 'app/shared/model/receipt-service.model';
import { IReceiptDrug } from 'app/shared/model/receipt-drug.model';

export interface IReceipt {
    id?: number;
    issueTime?: Moment;
    visit?: IVisit;
    receiptServices?: IReceiptService[];
    receiptDrugs?: IReceiptDrug[];
}

export class Receipt implements IReceipt {
    constructor(
        public id?: number,
        public issueTime?: Moment,
        public visit?: IVisit,
        public receiptServices?: IReceiptService[],
        public receiptDrugs?: IReceiptDrug[]
    ) {}
}
