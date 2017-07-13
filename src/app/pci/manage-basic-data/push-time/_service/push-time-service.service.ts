import { Inject, Injectable } from '@angular/core';

const PATH = {
  pushTime: 'opt/app/configs/generalPushTime', // 推送时间
  pushTimeEdit: 'opt/app/configs/update/general/pushTime', // 编辑推送时间
};

@Injectable()
export class PushTimeService {

  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService
  ) {
  }

  getPushTime() {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.pushTime}`);
  }

  PushTimeEdit(data) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.pushTimeEdit}?pushTime=${data}`, {});
  }
}
