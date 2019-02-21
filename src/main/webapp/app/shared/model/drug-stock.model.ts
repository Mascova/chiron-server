import { Moment } from 'moment';

export interface IDrugStock {
    id?: number;
    buyDate?: Moment;
    buyPrice?: number;
    amount?: number;
    expiryDate?: Moment;
    sellPrice?: number;
}

export class DrugStock implements IDrugStock {
    constructor(
        public id?: number,
        public buyDate?: Moment,
        public buyPrice?: number,
        public amount?: number,
        public expiryDate?: Moment,
        public sellPrice?: number
    ) {}
}
