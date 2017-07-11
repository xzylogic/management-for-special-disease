import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'doctor',
  loadChildren: 'app/pci/manage-doctor/doctor/doctor.module#DoctorModule'
}];
