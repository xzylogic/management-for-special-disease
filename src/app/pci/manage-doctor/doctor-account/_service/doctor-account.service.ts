import { Injectable, Inject } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class DoctorAccountService {

  constructor(@Inject('admin') private admin, private _apiService: ApiService) {}

  /**
   * 收入列表
   * @param {[type]} body [description]
   */
  getDetailList(doctorId: number, size: number, page: number) {
    return this._apiService.get(`${PATH.incomeDetailList}?doctorId=${doctorId}&size=${size}&page=${page}`);
  }

  /**
   * 获取待处理数量
   * @param {[type]} body [description]
   */
  getCount() {
    return this._apiService.get(`${PATH.incomeExchangeCount}`);
  }

  /**
   * 医生兑换列表
   * @param {[type]} body [description]
   */
  getExchangeList(doctorId: number, size: number, page: number) {
    return this._apiService.get(`${PATH.incomeExchangeList}?doctorId=${doctorId}&size=${size}&page=${page}`);
  }

  /**
   * 所有账户列表
   * @param {[type]} body [description]
   */
  getDoctorAccounts(page: number, size: number) {
    return this._apiService.get(`${PATH.incomeList}?size=${size}&page=${page}`);
  }

  /**
   * 兑换处理
   * @param {[type]} body [description]
   */
  getPurchase(id: number, expressNo: string, expressName: string, status: number) {
    return this._apiService.postParma(`${PATH.incomePurchase}?id=${id}&adminId=${this.admin.getId()}&expressNo=${expressNo}&expressName=${expressName}&status=${status}`);
  }

  /**
   * 兑换列表
   * @param {[type]} body [description]
   */
  getCommodityExchanges(page: number, size: number) {
    return this._apiService.get(`${PATH.incomePurchaseList}?size=${size}&page=${page}`);
  }

  /**
   * 提现处理
   * @param {[type]} body [description]
   */
  getWithdraw(id: number) {
    return this._apiService.postParma(`${PATH.incomeWithdraw}?id=${id}&adminId=${this.admin.getId()}`);
  }

  /**
   * 提现列表
   * @param {[type]} body [description]
   */
  getWithdrawDeposits(page: number, size: number) {
    return this._apiService.get(`${PATH.incomeWithdrawList}?size=${size}&page=${page}`);
  }

}
