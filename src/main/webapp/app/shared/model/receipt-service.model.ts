export interface IReceiptService {
    id?: number;
    amount?: number;
    price?: number;
}

export class ReceiptService implements IReceiptService {
    constructor(public id?: number, public amount?: number, public price?: number) {}
}
