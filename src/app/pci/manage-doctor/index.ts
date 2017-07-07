import { Routes } from '@angular/router';
import { DoctorReducer } from './doctor/_store/doctor.reducer';

export const routes: Routes = [{
  path: 'doctor',
  loadChildren: 'app/pci/manage-doctor/doctor/doctor.module#DoctorModule'
}];

export const reducer = {
  doctor: DoctorReducer
};
