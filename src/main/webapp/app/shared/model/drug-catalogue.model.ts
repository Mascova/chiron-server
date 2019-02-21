export interface IDrugCatalogue {
    id?: number;
    name?: string;
    description?: string;
}

export class DrugCatalogue implements IDrugCatalogue {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
