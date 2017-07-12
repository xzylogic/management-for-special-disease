import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'ad-doctor',
  loadChildren: 'app/pci/manage-ad/ad-doctor/ad-doctor.module#AdDoctorModule'
}, {
  path: 'ad-patient',
  loadChildren: 'app/pci/manage-ad/ad-patient/ad-patient.module#AdPatientModule'
}];
