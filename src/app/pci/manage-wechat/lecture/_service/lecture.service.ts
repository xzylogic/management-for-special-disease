import { Injectable } from '@angular/core';

@Injectable()
export class LectureService {

  // constructor(private _apiService: ApiService) {
  // }
  //
  // /**
  //  * 获取讲座列表
  //  */
  // getLecture() {
  //   return this._apiService.get(`${PATH.lectureList}`);
  // }
  //
  // /**
  //  * 新增讲座
  //  */
  // lectureCreate(data) {
  //   return this._apiService.post(`${PATH.lectureSave}`, data);
  // }
  //
  // /**
  //  * 编辑医院
  //  */
  // lectureEdit(data) {
  //   return this._apiService.put(`${PATH.lectureEdit}`, data);
  // }
  //
  // /**
  //  * 报名签到
  //  */
  // getApply(id: number, signStatus = "", joinStatus = "", page: number, size: number) {
  //   return this._apiService.get(`${PATH.lectureApply}?lectureId=${id}&signStatus=${signStatus}&joinStatus=${joinStatus}&size=${size}$page=${page}`);
  // }
  //
  // /**
  //  * 更改线上线下删除
  //  */
  // lectureStatus(data) {
  //   return this._apiService.post(`${PATH.lectureStatus}`, data);
  // }
}
