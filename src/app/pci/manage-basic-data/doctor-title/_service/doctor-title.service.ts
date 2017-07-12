import { Inject, Injectable } from '@angular/core';

const PATH = {
  positionalTitleList: 'api/doctortitle/all', // 职称列表
  positionalTitleCreate: 'api/doctortitle/edit', // 新建职称
  positionalTitleEdit: 'api/doctortitle/edit', // 编辑职称
};

@Injectable()
export class DoctorTitleService {

  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取职称列表
   */
  getDoctorTitles() {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.positionalTitleList}`);
  }

  /**
   * 新建职称
   * @param {[type]} data [description]
   */
  doctorTitleCreate(data) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.positionalTitleCreate}`, data);
  }

  /**
   * 编辑职称
   * @param {[type]} data [description]
   */
  doctorTitleEdit(data) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.positionalTitleEdit}`, data);
  }
}
