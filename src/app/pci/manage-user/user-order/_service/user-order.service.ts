import { Injectable, Inject } from '@angular/core';

import { ContainerConfig } from '../../../../libs';

const PATH = {
  userOrderList: 'opt/healthOrders/listAll', // 患者全部订单列表
  userOrderQuery: 'opt/healthOrders/query', // 查询患者订单
  userOrderRefundList: 'opt/healthOrders/listRefund', // 患者退款订单
  userOrderServicingList: 'opt/healthOrders/listInvalids', // 患者服务中订单
  userOrderThirdList: 'opt/healthOrders/listThirdServices', // 患者第三方服务订单
  userOrderRefundConfirm: 'opt/healthOrders/refund', // 确认退款
  userOrderThirdProcess: 'opt/healthOrders/processThirdService', // 处理第三方服务
  userOrderCount: 'opt/healthOrders/countOrders', // 患者订单统计

  orderRecordList: 'opt/serviceRecords/listRecord', // 服务记录列表
  orderRecordCreate: 'opt/serviceRecords/addServiceRecord', // 添加服务记录
  orderRecordDel: 'opt/serviceRecords/deleteServiceRecord', // 删除服务记录
  orderRecordServiceList: 'opt/serviceRecords/listServiceName', // 选择服务列表
};

@Injectable()
export class UserOrderService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
    @Inject('auth') private authService
  ) {
  }

  userOrderConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者订单管理',
      subTitle: '患者订单列表',
      ifHome: true,
      homeRouter: '/user-order',
      currentRouter: '/user-order'
    });
  }

  userOrderEditConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者订单管理',
      subTitle: '使用情况',
      ifHome: false,
      homeRouter: '/user-order',
      currentRouter: '/user-order/edit'
    });
  }


  getUserOrders(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderList}?page=${page}&size=${size}`);
  }

  queryUserOrder(queryString: string, page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderQuery}?pram=${queryString}&page=${page}&size=${size}`);
  }

  getUserOrderRefunds(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderRefundList}?page=${page}&size=${size}`);
  }

  getUserOrderServicings(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderServicingList}?page=${page}&size=${size}`);
  }

  getUserOrderThirds(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderThirdList}?page=${page}&size=${size}`);
  }

  userOrderRefund(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderRefundConfirm}?oid=${id}`);
  }

  userOrderProcess(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderThirdProcess}?oid=${id}`);
  }

  getOrderRecordList(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.orderRecordList}?orderId=${id}`);
  }

  orderRecordCreate(id: number, serviceName: string) {
    return this.httpService.postParma(`${this.app.pci.BASE_URL}${PATH.orderRecordCreate}?id=${id}&serviceName=${serviceName}&operator=${this.authService.getAdminName()}`);
  }

  orderRecordDel(id: number) {
    return this.httpService.delete(`${this.app.pci.BASE_URL}${PATH.orderRecordDel}?rid=${id}`);
  }

  getOrderRecordServiceList(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.orderRecordServiceList}?orderId=${id}`);
  }

  getUserOrderCount() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderCount}`);
  }
}
