import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'doctor',
  loadChildren: 'app/pci/manage-doctor/doctor/doctor.module#DoctorModule'
},
  {
    path: 'doctor-account',
    loadChildren: 'app/container/group-doctor/doctor-account/doctor-account.module#DoctorAccountModule'
  },
  {
    path: 'doctor-group',
    loadChildren: 'app/container/group-doctor/doctor-group/doctor-group.module#DoctorGroupModule'
  },
  {
    path: 'relationship',
    loadChildren: 'app/container/group-doctor/relationship/relationship.module#RelationshipModule'
  }];
