import { Inject, Injectable } from '@angular/core';

const PATH = {
  drugList: 'api/medicine/list', // 药品列表
  drugDelete: 'api/medicine/delete', // 删除药品
  drugUpdate: 'api/medicine/update', // 编辑药品
  drugSave: 'api/medicine/save', // 新建药品
};

@Injectable()
export class DrugService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取药品列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   * @param {string} search   [description]
   */
  getDrugs(page: number, size: number, search?: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.drugList}?page=${page}&size=${size}&keyword=${search || ''}`);
  }

  /**
   * 新建药品
   * @param {[type]} data [description]
   */
  drugCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.drugSave}`, data);
  }

  /**
   * 编辑药品
   * @param {[type]} data [description]
   */
  drugEdit(data) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.drugUpdate}`, data);
  }
}
