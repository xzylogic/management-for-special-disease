import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'department',
  loadChildren: 'app/pci/manage-basic-data/department/department.module#DepartmentModule'
}, {
  path: 'discomfort-symptom',
  loadChildren: 'app/pci/manage-basic-data/discomfort-symptom/discomfort-symptom.module#DiscomfortSymptomModule'
}, {
  path: 'doctor-sort',
  loadChildren: 'app/pci/manage-basic-data/doctor-sort/doctor-sort.module#DoctorSortModule'
}, {
  path: 'doctor-title',
  loadChildren: 'app/pci/manage-basic-data/doctor-title/doctor-title.module#DoctorTitleModule'
}, {
  path: 'drug',
  loadChildren: 'app/pci/manage-basic-data/drug/drug.module#DrugModule'
}, {
  path: 'flower-grade',
  loadChildren: 'app/pci/manage-basic-data/flower-grade/flower-grade.module#FlowerGradeModule'
}, {
  path: 'follow-up-plan',
  loadChildren: 'app/pci/manage-basic-data/follow-up-plan/follow-up-plan.module#FollowUpPlanModule'
}, {
  path: 'health-organization',
  loadChildren: 'app/pci/manage-basic-data/health-organization/health-organization.module#HealthOrganizationModule'
}, {
  path: 'hospital',
  loadChildren: 'app/pci/manage-basic-data/hospital/hospital.module#HospitalModule'
}, {
  path: 'news-classify',
  loadChildren: 'app/pci/manage-basic-data/news-classify/news-classify.module#NewsClassifyModule'
}, {
  path: 'push-time',
  loadChildren: 'app/pci/manage-basic-data/push-time/push-time.module#PushTimeModule'
}, {
  path: 'inspection-category',
  loadChildren: 'app/pci/manage-basic-data/inspection-category/inspection-category.module#InspectionCategoryModule'
}, {
  path: 'inspection-item',
  loadChildren: 'app/pci/manage-basic-data/inspection-item/inspection-item.module#InspectionItemModule'
}, {
  path: 'download-origin',
  loadChildren: 'app/pci/manage-basic-data/download-origin/download-origin.module#DownloadOriginModule'
}];

export const stores = {
  department: createReducer('department', [0], {}),
  discomfortSymptom: createReducer('discomfortSymptom', [0], {}),
  doctorSort: createReducer('doctorSort', [0], {}),
  doctorTitle: createReducer('doctorTitle', [0], {}),
  downloadOrigin: createReducer('downloadOrigin', [0], {}),
  drug: createReducer('drug', [0], {}),
  flowerGrade: createReducer('flowerGrade', [0], {}),
  followUpPlan: createReducer('followUpPlan', [0], {}),
  healthOrganization: createReducer('healthOrganization', [0], {}),
  hospital: createReducer('hospital', [0], {}),
  inspectionItem: createReducer('inspectionItem', [0], {}),
  pushTime: createReducer('pushTime', [0], {}),
};
