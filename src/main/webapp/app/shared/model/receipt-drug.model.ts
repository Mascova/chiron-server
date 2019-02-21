export interface IReceiptDrug {
    id?: number;
    amount?: number;
    price?: number;
}

export class ReceiptDrug implements IReceiptDrug {
    constructor(public id?: number, public amount?: number, public price?: number) {}
}
