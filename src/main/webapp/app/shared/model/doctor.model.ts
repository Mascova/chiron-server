import { Moment } from 'moment';
import { IVisit } from 'app/shared/model/visit.model';

export interface IDoctor {
    id?: number;
    nik?: string;
    name?: string;
    address?: string;
    dob?: Moment;
    phoneNo1?: string;
    phoneNo2?: string;
    visits?: IVisit[];
}

export class Doctor implements IDoctor {
    constructor(
        public id?: number,
        public nik?: string,
        public name?: string,
        public address?: string,
        public dob?: Moment,
        public phoneNo1?: string,
        public phoneNo2?: string,
        public visits?: IVisit[]
    ) {}
}
