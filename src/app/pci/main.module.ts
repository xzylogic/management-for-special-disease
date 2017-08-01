import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule, MdChipsModule,
  MdIconModule, MdSidenavModule, MdToolbarModule
} from '@angular/material';

import { LoginModule } from './app-login/login.module';
import { PciRoutingModule } from './main-routing.module';
import { PciMainComponent } from './main.component';
import { NavigationComponent } from './navigation/navigtion.component';
import { AuthGuardService } from './_service/auth-guard.service';
import { AuthService } from './_service/auth.service';
import { HttpService } from '../libs/_service/http.service';
import { NavigationService } from './_service/navigation.service';

import { app } from '../../environments/environment';

import { StoreModule } from './store.module';
import { MainAction } from './_store/main.action';
import { ApiAction } from './_store/api/api.action';
import { CommonService } from './_service/common.service';

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
    CommonService,
    {provide: 'http', useClass: HttpService},
    {provide: 'auth', useClass: AuthService},
    {provide: 'nav', useClass: NavigationService},
    {provide: 'common', useClass: CommonService},
    {provide: 'main', useClass: MainAction},
    {provide: 'action', useClass: ApiAction},
    {provide: 'app', useValue: app},
  ]
})
export class PciMainModule {
}
