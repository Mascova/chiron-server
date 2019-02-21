import { IPatient } from 'app/shared/model/patient.model';

export interface IVisit {
    id?: number;
    visitTime?: string;
    symptoms?: string;
    diagnose?: string;
    status?: number;
    patient?: IPatient;
}

export class Visit implements IVisit {
    constructor(
        public id?: number,
        public visitTime?: string,
        public symptoms?: string,
        public diagnose?: string,
        public status?: number,
        public patient?: IPatient
    ) {}
}
