import { IService } from 'app/shared/model/service.model';
import { IReceipt } from 'app/shared/model/receipt.model';

export interface IReceiptService {
    id?: number;
    amount?: number;
    price?: number;
    service?: IService;
    receipt?: IReceipt;
}

export class ReceiptService implements IReceiptService {
    constructor(public id?: number, public amount?: number, public price?: number, public service?: IService, public receipt?: IReceipt) {}
}
