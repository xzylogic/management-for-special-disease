import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: '/pci/doctor',
  pathMatch: 'full'
}, {
  path: 'pci',
  loadChildren: 'app/pci/main.module#PciMainModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
