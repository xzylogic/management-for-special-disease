export interface IDoctorState {
  readonly tab: number;
  readonly tabPage0: number;
  readonly tabPage1: number;
  readonly tabPage2: number;
  readonly doctor: Doctor;
}

export class Doctor {
  id: number;
  tel: string;
  name: string;
  hospitalId: number;
  departmentId: number;
  doctorTitleId: number;
  avatarUrl: string;
  certificationUrl: string;
  description: string;

  constructor(obj?: Doctor) {
    this.id = obj && obj.id || 0;
    this.tel = obj && obj.tel || '';
    this.name = obj && obj.name || '';
    this.hospitalId = obj && obj.hospitalId || 1;
    this.departmentId = obj && obj.departmentId || 1;
    this.doctorTitleId = obj && obj.doctorTitleId || 1;
    this.avatarUrl = obj && obj.avatarUrl || '';
    this.certificationUrl = obj && obj.certificationUrl || '';
    this.description = obj && obj.description || '';
  }
}
