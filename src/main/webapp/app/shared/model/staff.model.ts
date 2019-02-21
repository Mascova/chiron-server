import { Moment } from 'moment';

export interface IStaff {
    id?: number;
    nik?: string;
    name?: string;
    address?: string;
    dob?: Moment;
    phoneNo1?: string;
    phoneNo2?: string;
}

export class Staff implements IStaff {
    constructor(
        public id?: number,
        public nik?: string,
        public name?: string,
        public address?: string,
        public dob?: Moment,
        public phoneNo1?: string,
        public phoneNo2?: string
    ) {}
}
