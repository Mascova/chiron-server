export interface IService {
    id?: number;
    code?: string;
    name?: string;
    price?: number;
}

export class Service implements IService {
    constructor(public id?: number, public code?: string, public name?: string, public price?: number) {}
}
