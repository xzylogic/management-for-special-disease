import { Inject, Injectable } from '@angular/core';

const PATH = {
  healthNewsList: 'api/article/list', // 获取所有资讯
  healthNewsUpdate: 'api/article/update', // 修改健康资讯
  healthNewsDelete: 'api/article/delete', // 删除健康资讯
  healthNewsCreate: 'api/article/save', // 新增健康资讯
  healthNewsFactor: 'api/article/factor', // 读取修改健康咨询系数
  healthInfoList: 'api/articleType/list', // 获取所有资讯分类
};

@Injectable()
export class HealthNewsService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取新闻资讯类型列表
   */
  getHealthNewsType() {
    return this.httpService.get(`${PATH.healthInfoList}`);
  }

  /**
   * 获取新闻资讯列表
   */
  getHealthNews(typeId: number, page: number, size: number) {
    return this.httpService.get(`${PATH.healthNewsList}?typeId=${typeId}&size=${size}&page=${page}`);
  }

  /**
   * 新建新闻资讯
   */
  healthNewsCreate(data) {
    return this.httpService.post(`${PATH.healthNewsCreate}`, data);
  }

  /**
   * 编辑新闻资讯
   */
  healthNewsUpdate(data) {
    return this.httpService.put(`${PATH.healthNewsUpdate}`, data);
  }

  /**
   * 删除新闻资讯
   */
  healthNewsDelete(id: number) {
    return this.httpService.delete(`${PATH.healthNewsDelete}?id=${id}`);
  }

  /**
   * 读取健康资讯系数
   */
  healthNewsFetch() {
    return this.httpService.get(`${PATH.healthNewsFactor}`);
  }

  /**
   * 修改健康资讯系
   */
  healthNewsEdit(data) {
    return this.httpService.put(`${PATH.healthNewsFactor}`, data);
  }
}
