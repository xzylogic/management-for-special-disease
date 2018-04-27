import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [{
//   path: '',
//   loadChildren: 'app/pci/main.module#PciMainModule'
// }];
const routes: Routes = [{
  path: '',
  loadChildren: 'app/medical-record/main.module#MainModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
