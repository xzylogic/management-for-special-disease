import { Inject, Injectable } from '@angular/core';

const PATH = {
  downloadOrigin: 'api/operational/channel',
};

@Injectable()
export class DownloadOriginService {

  constructor(@Inject('http') private httpService) {
  }

  getDownloadOrigin() {
    return this.httpService.get(`${PATH.downloadOrigin}`);
  }

  downloadOriginCreate(data) {
    return this.httpService.post(`${PATH.downloadOrigin}`, data);
  }

  downloadOriginUpdate(id, data) {
    return this.httpService.put(`${PATH.downloadOrigin}/${id}`, data);
  }

  downloadOriginDel(id) {
    return this.httpService.del(`${PATH.downloadOrigin}/${id}`);
  }
}
