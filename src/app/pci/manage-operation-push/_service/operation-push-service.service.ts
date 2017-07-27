import { Inject, Injectable } from '@angular/core';

const PATH = {
  operationPushSave: 'opt/operational/pushs/update', // 新增修改推送
  operationPush: 'opt/operational/pushs/list/', // 推送列表
  operationPushSend: 'opt/operational/pushs/send/', // 发送推送
  operationPushDel: 'opt/operational/pushs/delete/', // 删除推送
};

@Injectable()
export class OperationPushService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 推送列表
   */
  getOperationPush(idx: number, page: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.operationPush}${idx}?flag=${page}`);
  }

  /**
   * 新增修改推送
   */
  OperationPushAdd(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.operationPushSave}`, data);
  }

  /**
   * 发送推送
   */
  OperationPushSend(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.operationPushSend}${id}`);
  }

  /**
   * 删除推送
   */
  OperationPushDelete(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.operationPushDel}${id}`);
  }
}
