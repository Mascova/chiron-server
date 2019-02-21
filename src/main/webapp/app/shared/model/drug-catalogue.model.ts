import { IDrugStock } from 'app/shared/model/drug-stock.model';

export interface IDrugCatalogue {
    id?: number;
    name?: string;
    description?: string;
    drugStocks?: IDrugStock[];
}

export class DrugCatalogue implements IDrugCatalogue {
    constructor(public id?: number, public name?: string, public description?: string, public drugStocks?: IDrugStock[]) {}
}
