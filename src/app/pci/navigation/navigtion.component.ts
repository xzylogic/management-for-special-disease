import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NavigationService } from '../_service/navigation.service';
import { AuthService } from '../_service/auth.service';
import { Sidebar } from '../_store/navigation.state';
// import * as Ps from 'perfect-scrollbar';
// const Ps = require('perfect-scrollbar');

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  sidebars: Observable<Sidebar[]>;
  username: Observable<string>;

  constructor(
    public sidebarService: NavigationService,
    public authService: AuthService,
  ) {
  }

  ngOnInit() {
    console.log('init navigation');
    this.initSidebars();
    this.sidebarService.setCount(100, 'doctorgroup', 'doctor');
    this.sidebarService.setCount(80, 'doctorgroup', 'doctoraccount');
    this.username = this.sidebarService.getUserName();
    this.sidebars = this.sidebarService.getSidebars();
  }

  ngAfterViewInit() {
    // const container = document.getElementById('container');
    // Ps.initialize(container, {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   suppressScrollX: true
    // });
    // Ps.update(container);
  }

  initSidebars() {
    const path = window.location.pathname.split('/')[1];
    this.sidebarService.initSidebars(path);
    this.setCount();
  }

  setCount() {
    // this.sidebarService.getDoctorCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'doctor', group: 'doctorgroup', tag: data.data};
    //       this.sidebarService.setNavCount(count);
    //     }
    //   });
    // this.sidebarService.getDoctorAccountCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'doctoraccount', group: 'doctorgroup', tag: data.data.purchase + data.data.withdraw};
    //       this.sidebarService.setNavCount(count);
    //     }
    //   });
    // this.sidebarService.getUserCertificationCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'usercertification', group: 'usergroup', tag: data.data.auditing};
    //       this.sidebarService.setNavCount(count);
    //     }
    //   });
    // this.sidebarService.getDoctorGroupCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'doctorgroup', group: 'doctorgroup', tag: data.data};
    //       this.sidebarService.setNavCount(count);
    //     }
    //   });
    // this.sidebarService.getUserOrderCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'userorder', group: 'usergroup', tag: data.data.refundSum + data.data.thirdSum};
    //       this.sidebarService.setNavCount(count);
    //     }
    //   });
  }

  toggleSub(sidebar) {
    sidebar.open = !sidebar.open;
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    console.log('destroy navigation')
  }

}
