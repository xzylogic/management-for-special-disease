import { Injectable } from "@angular/core";

import { PATH } from '../../_services/api-url';
import { ApiService } from "../../_services/api";

@Injectable()
export class VersionControlService {

  constructor(private _apiService: ApiService) {
  }

  /**
   * 获取版本控制列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getVersionControls(page: number, size: number) {
    return this._apiService.get(`${PATH.versionList}?page=${page}&size=${size}`);
  }

  /**
   * 新建版本控制
   * @param {[type]} body [description]
   */
  versionControlCreate(body) {
    return this._apiService.post(`${PATH.versionSave}`, body);
  }

  /**
   * 更新版本控制
   * @param {[type]} body [description]
   */
  versionControlUpdate(body) {
    return this._apiService.put(`${PATH.versionUpdate}`, body);
  }

}
