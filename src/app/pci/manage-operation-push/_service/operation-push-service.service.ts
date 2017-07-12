import { Injectable } from "@angular/core";

import { PATH } from '../../_services/api-url';
import { ApiService } from "../../_services/api";

@Injectable()
export class OperationPushService {

  constructor(private _apiService: ApiService) {}

  /**
   * 推送列表
   */
  getOperationPush(idx:number,page:number) {
    return this._apiService.get(`${PATH.operationPush}${idx}?flag=${page}`);
  }

 /**
  * 新增修改推送
  * @param {[type]} body [description]
  */
  OperationPushAdd(data){
    return this._apiService.post(`${PATH.operationPushSave}`, data);
  }

  /**
  * 发送推送
  * @param {[type]} body [description]
  */
  OperationPushSend(id:number){
    return this._apiService.get(`${PATH.operationPushSend}${id}`);
  }

  /**
  * 删除推送
  * @param {[type]} body [description]
  */
  OperationPushDelete(id:number){
    return this._apiService.get(`${PATH.operationPushDel}${id}`);
  }
}
