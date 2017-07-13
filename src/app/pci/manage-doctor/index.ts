import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'doctor',
  loadChildren: 'app/pci/manage-doctor/doctor/doctor.module#DoctorModule'
}, {
  path: 'doctor-account',
  loadChildren: 'app/pci/manage-doctor/doctor-account/doctor-account.module#DoctorAccountModule'
}, {
  path: 'doctor-group',
  loadChildren: 'app/pci/manage-doctor/doctor-group/doctor-group.module#DoctorGroupModule'
}, {
  path: 'relationship',
  loadChildren: 'app/pci/manage-doctor/relationship/relationship.module#RelationshipModule'
}];
