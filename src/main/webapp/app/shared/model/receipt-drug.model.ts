import { IReceipt } from 'app/shared/model/receipt.model';
import { IDrugStock } from 'app/shared/model/drug-stock.model';

export interface IReceiptDrug {
    id?: number;
    amount?: number;
    price?: number;
    receipt?: IReceipt;
    drugStock?: IDrugStock;
}

export class ReceiptDrug implements IReceiptDrug {
    constructor(
        public id?: number,
        public amount?: number,
        public price?: number,
        public receipt?: IReceipt,
        public drugStock?: IDrugStock
    ) {}
}
