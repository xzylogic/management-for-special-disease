import { Injectable, Inject } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class UserOrderService {

  constructor(@Inject('admin') private admin, private _apiService: ApiService) {
  }

  getUserOrders(page: number, size: number) {
    return this._apiService.get(`${PATH.userOrderList}?page=${page}&size=${size}`);
  }

  queryUserOrder(queryString: string, page: number, size: number) {
    return this._apiService.get(`${PATH.userOrderQuery}?pram=${queryString}&page=${page}&size=${size}`);
  }

  getUserOrderRefunds(page: number, size: number) {
    return this._apiService.get(`${PATH.userOrderRefundList}?page=${page}&size=${size}`);
  }

  getUserOrderServicings(page: number, size: number) {
    return this._apiService.get(`${PATH.userOrderServicingList}?page=${page}&size=${size}`);
  }

  getUserOrderThirds(page: number, size: number) {
    return this._apiService.get(`${PATH.userOrderThirdList}?page=${page}&size=${size}`);
  }

  userOrderRefund(id: number) {
    return this._apiService.get(`${PATH.userOrderRefundConfirm}?oid=${id}`);
  }

  userOrderProcess(id: number) {
    return this._apiService.get(`${PATH.userOrderThirdProcess}?oid=${id}`);
  }

  getOrderRecordList(id: number) {
    return this._apiService.get(`${PATH.orderRecordList}?orderId=${id}`);
  }

  orderRecordCreate(id: number, serviceName: string) {
    return this._apiService.postParma(`${PATH.orderRecordCreate}?id=${id}&serviceName=${serviceName}&operator=${this.admin.getName()}`);
  }

  orderRecordDel(id: number) {
    return this._apiService.delete(`${PATH.orderRecordDel}?rid=${id}`);
  }

  getOrderRecordServiceList(id: number) {
    return this._apiService.get(`${PATH.orderRecordServiceList}?orderId=${id}`);
  }

  getUserOrderCount() {
    return this._apiService.get(`${PATH.userOrderCount}`);
  }

}
