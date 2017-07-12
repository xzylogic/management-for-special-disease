import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { Navbar } from '../_store/main.state';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  @select(['main', 'adminName']) readonly username: Observable<string>;
  @select(['main', 'navigation']) readonly sidebars: Observable<Navbar[]>;

  constructor(
    @Inject('nav') private navService,
    @Inject('auth') private authService
  ) {
  }

  ngOnInit() {
    console.log('init navigation');
    this.initSidebars();
    this.navService.setCount(100, 'doctorgroup', 'doctor');
    this.navService.setCount(80, 'doctorgroup', 'doctoraccount');
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
    this.navService.initSidebars(path);
    this.setCount();
  }

  setCount() {
    // this.navService.getDoctorCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'doctor', group: 'doctorgroup', tag: data.data};
    //       this.navService.setNavCount(count);
    //     }
    //   });
    // this.navService.getDoctorAccountCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'doctoraccount', group: 'doctorgroup', tag: data.data.purchase + data.data.withdraw};
    //       this.navService.setNavCount(count);
    //     }
    //   });
    // this.navService.getUserCertificationCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'usercertification', group: 'usergroup', tag: data.data.auditing};
    //       this.navService.setNavCount(count);
    //     }
    //   });
    // this.navService.getDoctorGroupCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'doctorgroup', group: 'doctorgroup', tag: data.data};
    //       this.navService.setNavCount(count);
    //     }
    //   });
    // this.navService.getUserOrderCount()
    //   .subscribe(data => {
    //     if (data.data && data.code === 0) {
    //       let count = {key: 'userorder', group: 'usergroup', tag: data.data.refundSum + data.data.thirdSum};
    //       this.navService.setNavCount(count);
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
