import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  // constructor(private _apiService: ApiService) {
  // }
  //
  // /**
  //  * 获取患者列表
  //  * @param {string} key     [description]
  //  * @param {boolean} bind   [description]
  //  * @param {number} page    [description]
  //  * @param {number} size    [description]
  //  */
  // getUsers(key: string, bind: boolean, page: number, size: number) {
  //   return this._apiService.get(`${PATH.userList}?keyword=${key}&binding=${bind}&page=${page}&size=${size}`);
  // }
  //
  // /**
  //  * 获取医院选项列表
  //  */
  // getOptions() {
  //   return this._apiService.get(`${PATH.userOptionList}`);
  // }
  //
  // /**
  //  * 新建患者
  //  * @param {[type]} body [description]
  //  */
  // userCreate(body) {
  //   return this._apiService.post(`${PATH.userCreate}`, body);
  // }
  //
  // /**
  //  * 更新患者信息
  //  * @param {[type]} body [description]
  //  */
  // userUpdate(body) {
  //   return this._apiService.post(`${PATH.userUpdate}`, body);
  // }
  //
  // /**
  //  * 个人积分明细表
  //  */
  // userIntegralDetail(traderId: number, page: number) {
  //   return this._apiService.get(`${PATH.IntegralDetail}${traderId}/0?flag=${page}`);
  // }
}
