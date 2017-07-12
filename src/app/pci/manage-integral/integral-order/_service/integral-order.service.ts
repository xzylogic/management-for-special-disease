import { Injectable, Inject } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class IntegralOrderService {

    constructor(private _apiService: ApiService) {}
    /**
     * 积分商品订单列表
     * @param {[type]} idx [description]
     * @param {[type]} flag [description]
     */
    getIntegralOrder(obj: {idx ? : number, flag ? : number}) {
        if(obj.idx && !obj.flag){
            return this._apiService.get(`${PATH.integralOrderList}?idx=${obj.idx}`);
        }else if(!obj.idx && obj.flag){
            return this._apiService.get(`${PATH.integralOrderList}?flag=${obj.flag}`);
        }else if(!obj.idx && !obj.flag){
            return this._apiService.get(`${PATH.integralOrderList}`);
        }else{
            return this._apiService.get(`${PATH.integralOrderList}?idx=${obj.idx}&flag=${obj.flag}`);
        }
  }

  /**
   * 积分订单商品数量
   */
   getIntegralOrderCount(){
       return this._apiService.get(`${PATH.integralOrderCount}`);
   }
    /**
     * 快递列表
     */
    getExpressList(){
        return this._apiService.get(`${PATH.integralExpressList}`);
    }

    /**
     * 编辑单号
     */

    // editExpressNo(exchangeId: number, courierId: number, trackingNum: string, operator: string, msg ? : string){
    //     if(!msg){
    //         return this._apiService.postParma(`${PATH.integralExpressEdit}?exchangeId=${exchangeId}&courierId=${courierId}&trackingNum=${trackingNum}&operator=${operator}`);
    //     }else{
    //         return this._apiService.postParma(`${PATH.integralExpressEdit}?exchangeId=${exchangeId}&courierId=${courierId}&trackingNum=${trackingNum}&operator=${operator}&msg=${msg}`);
    //     }
    // }

       editExpressNo(body){
            return this._apiService.post(`${PATH.integralExpressEdit}`,body);

    }

}
