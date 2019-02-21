import { Moment } from 'moment';
import { IDrugCatalogue } from 'app/shared/model/drug-catalogue.model';
import { IReceiptDrug } from 'app/shared/model/receipt-drug.model';

export interface IDrugStock {
    id?: number;
    buyDate?: Moment;
    buyPrice?: number;
    amount?: number;
    expiryDate?: Moment;
    sellPrice?: number;
    drugCatalogue?: IDrugCatalogue;
    receiptDrugs?: IReceiptDrug[];
}

export class DrugStock implements IDrugStock {
    constructor(
        public id?: number,
        public buyDate?: Moment,
        public buyPrice?: number,
        public amount?: number,
        public expiryDate?: Moment,
        public sellPrice?: number,
        public drugCatalogue?: IDrugCatalogue,
        public receiptDrugs?: IReceiptDrug[]
    ) {}
}
