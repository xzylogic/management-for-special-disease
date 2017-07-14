import { Inject, Injectable } from '@angular/core';

const PATH = {
  hospitalList: 'api/hospital/all', // 医院列表
  hospitalCreate: 'api/hospital/edit', // 新建医院
  hospitalEdit: 'api/hospital/edit', // 编辑医院
};

@Injectable()
export class HospitalService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取医院列表
   */
  getHospitals() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.hospitalList}`);
  }

  /**
   * 新建医院
   */
  hospitalCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.hospitalCreate}`, data);
  }

  /**
   * 编辑医院
   */
  hospitalEdit(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.hospitalEdit}`, data);
  }
}
