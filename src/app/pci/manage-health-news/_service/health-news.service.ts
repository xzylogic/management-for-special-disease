import { Injectable } from "@angular/core";

import { PATH } from '../../_services/api-url';
import { ApiService } from "../../_services/api";

@Injectable()
export class HealthNewsService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取新闻资讯类型列表
   */
  getHealthNewsType() {
    return this._apiService.get(`${PATH.healthInfoList}`);
  }

  /**
   * 获取新闻资讯列表
   * @param {[type]} body [description]
   */
  getHealthNews(typeId: number, page: number, size: number) {
    return this._apiService.get(`${PATH.healthNewsList}?typeId=${typeId}&size=${size}&page=${page}`);
  }

  /**
   * 新建新闻资讯
   * @param {[type]} body [description]
   */
  healthNewsCreate(data) {
    return this._apiService.post(`${PATH.healthNewsCreate}`, data);
  }

  /**
   * 编辑新闻资讯
   * @param {[type]} body [description]
   */
  healthNewsUpdate(data) {
    return this._apiService.put(`${PATH.healthNewsUpdate}`, data);
  }

  /**
   * 删除新闻资讯
   * @param {[type]} body [description]
   */
  healthNewsDelete(id: number) {
    return this._apiService.delete(`${PATH.healthNewsDelete}?id=${id}`);
  }

  /**
   * 读取健康资讯系数
   * @param {[type]} body [description]
   */
  healthNewsFetch() {
    return this._apiService.get(`${PATH.healthNewsFactor}`);
  }

  /**
   * 修改健康资讯系数
   * @param {[type]} body [description]
   */
  healthNewsEdit(data) {
    return this._apiService.put(`${PATH.healthNewsFactor}`,data);
  }

}
