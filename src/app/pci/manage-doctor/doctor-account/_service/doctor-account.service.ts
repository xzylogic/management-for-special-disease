import { Injectable, Inject } from '@angular/core';

const PATH = {
  incomeDetailList: 'api/income/detail/list', // 收入列表
  incomeExchangeCount: 'api/income/exchange/count', // 获取待处理数量
  incomeExchangeList: 'api/income/exchange/list', // 医生兑换列表
  incomeList: 'api/income/list', // 所有账户列表
  incomePurchase: 'api/income/purchase', // 兑换处理
  incomePurchaseList: 'api/income/purchase/list', // 兑换列表
  incomeWithdraw: 'api/income/withdraw', // 提现处理
  incomeWithdrawList: 'api/income/withdraw/list', // 提现列表
};

@Injectable()
export class DoctorAccountService {

  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService,
    @Inject('auth') private admin,
  ) {
  }

  /**
   * 收入列表
   */
  getDetailList(doctorId: number, size: number, page: number) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.incomeDetailList}?doctorId=${doctorId}&size=${size}&page=${page}`);
  }

  /**
   * 获取待处理数量
   */
  getCount() {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.incomeExchangeCount}`);
  }

  /**
   * 医生兑换列表
   */
  getExchangeList(doctorId: number, size: number, page: number) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.incomeExchangeList}?doctorId=${doctorId}&size=${size}&page=${page}`);
  }

  /**
   * 所有账户列表
   */
  getDoctorAccounts(page: number, size: number) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.incomeList}?size=${size}&page=${page}`);
  }

  /**
   * 兑换处理
   */
  getPurchase(id: number, expressNo: string, expressName: string, status: number) {
    return this.httpService.post(
      `${this.api.pci.BASE_URL}${PATH.incomePurchase}?
        id=${id}&adminId=${this.admin.getAdminName()}
        &expressNo=${expressNo}&expressName=${expressName}&status=${status}`,
      {}
    );
  }

  /**
   * 兑换列表
   */
  getCommodityExchanges(page: number, size: number) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.incomePurchaseList}?size=${size}&page=${page}`);
  }

  /**
   * 提现处理
   */
  getWithdraw(id: number) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.incomeWithdraw}?id=${id}&adminId=${this.admin.getId()}`, {});
  }

  /**
   * 提现列表
   */
  getWithdrawDeposits(page: number, size: number) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.incomeWithdrawList}?size=${size}&page=${page}`);
  }
}
