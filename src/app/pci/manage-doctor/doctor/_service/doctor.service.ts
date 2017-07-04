import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../libs/_service/http.service';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { DoctorState } from '../_store/doctor.state';
import { Store } from '@ngrx/store';
import { TabChangeAction } from '../_store/doctor.action';
const PATH = {
  doctorQuery: 'api/doctor/query', // 查询选项列表
  sendMessage: 'doctor/sendMsg', // 编辑短信提醒医生
};

@Injectable()
export class DoctorService {
  constructor(
    @Inject('app') private app,
    private store$: Store<DoctorState>,
    private httpService: HttpService,
  ) {
  }

  doctorConfig() {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: '医生信息列表',
      ifHome: true,
      homeRouter: '/doctor',
      currentRouter: '/doctor'
    });
  }

  getTab() {
    return this.store$.select(state => state.tab);
  }

  setTab(tab: number) {
    return this.store$.dispatch(new TabChangeAction(tab));
  }

  getPage0() {
    return this.store$.select(state => state.tabPage0);
  }

  getDoctors(key: string, page: number, size: number, index: number) {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.doctorQuery}?page=${page}&size=${size}&param=${key}&index=${index}`
    );
  }

  getAuditedDoctors(key: string, page: number, size: number) {
    return this.getDoctors(key, page, size, 1);
  }

  getAuditingDoctors(key: string, page: number, size: number) {
    return this.getDoctors(key, page, size, 2);
  }

  getFailureDoctors(key: string, page: number, size: number) {
    return this.getDoctors(key, page, size, 3);
  }
}
