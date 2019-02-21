import { IReceiptService } from 'app/shared/model/receipt-service.model';

export interface IService {
    id?: number;
    code?: string;
    name?: string;
    price?: number;
    receiptServices?: IReceiptService[];
}

export class Service implements IService {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public price?: number,
        public receiptServices?: IReceiptService[]
    ) {}
}
