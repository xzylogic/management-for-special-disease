import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { LoginModule } from './app-login/login.module';
import { PciRoutingModule } from './main-routing.module';
import { PciMainComponent } from './main.component';
import { NavigationComponent } from './navigation/navigtion.component';
import { AuthGuardService } from './_service/auth-guard.service';
import { AuthService } from './_service/auth.service';
import { HttpService } from '../libs/_service/http.service';
import { app } from '../../environments/environment';
import { NavigationService } from './_service/navigation.service';
import { MdButtonModule, MdChipsModule, MdIconModule, MdSidenavModule, MdToolbarModule } from '@angular/material';

import { MainAction } from './_store/main.action';
import { StoreModule } from './store.module';
import { ApiAction } from './_store/api/api.action';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdToolbarModule,
    MdSidenavModule,
    MdButtonModule,
    MdIconModule,
    MdChipsModule,
    LoginModule,
    PciRoutingModule,
    StoreModule
  ],
  declarations: [
    PciMainComponent,
    NavigationComponent
  ],
  providers: [
    HttpService,
    AuthService,
    AuthGuardService,
    NavigationService,
    MainAction,
    ApiAction,
    {provide: 'app', useValue: app},
  ]
})
export class PciMainModule {
}
