import { IPatient } from 'app/shared/model/patient.model';
import { IDoctor } from 'app/shared/model/doctor.model';

export interface IVisit {
    id?: number;
    visitTime?: string;
    symptoms?: string;
    diagnose?: string;
    status?: number;
    patient?: IPatient;
    doctor?: IDoctor;
}

export class Visit implements IVisit {
    constructor(
        public id?: number,
        public visitTime?: string,
        public symptoms?: string,
        public diagnose?: string,
        public status?: number,
        public patient?: IPatient,
        public doctor?: IDoctor
    ) {}
}
