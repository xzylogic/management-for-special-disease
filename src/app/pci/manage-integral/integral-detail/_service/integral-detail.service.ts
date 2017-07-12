import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class IntegralDetailService {
    constructor(private _apiService: ApiService) {}

 /**
   * 获取积分明细列表
   * @param {string} param [description]
   * @param {number} type   [description]
   * @param {number} flag   [description]
   */
  getIntegralDetail(obj: {type: number, param ? : string, flag ? : number}) {
    if(obj.param && !obj.flag){
      return this._apiService.get(`${PATH.integralDetailList}/${obj.type}?param=${obj.param}`);
    }else if(!obj.param && obj.flag){
      return this._apiService.get(`${PATH.integralDetailList}/${obj.type}?flag=${obj.flag}`);
    }else if( obj.param && obj.flag){
      return this._apiService.get(`${PATH.integralDetailList}/${obj.type}?param=${obj.param}&flag=${obj.flag}`);
    }else {
      return this._apiService.get(`${PATH.integralDetailList}/${obj.type}`);
    }
  }
}
