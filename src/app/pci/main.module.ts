import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { LoginModule } from './app-login/login.module';
import { PciRoutingModule } from './main-routing.module';
import { PciMainComponent } from './main.component';
import { NavigationComponent } from './navigation/navigtion.component';
import { AuthGuardService } from './_service/auth-guard.service';
import { AuthService } from './_service/auth.service';
import { HttpService } from '../libs/_service/http.service';
import { MainStore } from './_store/main.store';
import { app } from '../../environments/environment';
import { NavigationService } from './_service/navigation.service';
import { MdButtonModule, MdChipsModule, MdIconModule, MdSidenavModule, MdToolbarModule } from '@angular/material';

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
    StoreModule.provideStore(MainStore)
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
    {provide: 'app', useValue: app}
  ]
})
export class PciMainModule {
}
