import { Inject, Injectable } from '@angular/core';

const PATH = {
  packageServiceList: 'opt/combinatorials/list', // 套餐包列表
  packageServiceSave: 'opt/combinatorials/save', // 套餐包列表
  serviceOptionDList: 'opt/combinatorials/listDoctorPackage', // 医生服务列表
  serviceOptionTList: 'opt/combinatorials/listThirdSpecifications', // 第三方服务规格列表
};

@Injectable()
export class PackageServiceService {

  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService
  ) {
  }

  /**
   * [getPackageServices description]
   */
  getPackageServices() {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.packageServiceList}`);
  }

  /**
   * [packageServiceSave description]
   * @param {[type]} body [description]
   */
  packageServiceSave(body) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.packageServiceSave}`, body);
  }

  /**
   * [getServiceOptionD description]
   */
  getServiceOptionD() {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.serviceOptionDList}`);
  }

  /**
   * [getServiceOptionT description]
   */
  getServiceOptionT() {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.serviceOptionTList}`);
  }
}
