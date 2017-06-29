import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PciMainComponent } from './main.component';
import { PciRoutingModule } from './main-routing.module';
import { StoreModule } from '@ngrx/store';
import { MainStore } from './_store/main.store';
import { AuthGuardService } from './_service/auth-guard.service';
import { AuthService } from './_service/auth.service';
import { LoginModule } from './app-login/login.module';
import { HttpService } from '../libs/_service/http.service';
import { app } from '../../environments/environment';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    LoginModule,
    PciRoutingModule,
    StoreModule.provideStore(MainStore)
  ],
  declarations: [
    PciMainComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
    HttpService,
    {provide: 'app', useValue: app}
  ]
})
export class PciMainModule {
}
