import { Inject, Injectable } from '@angular/core';

const PATH = {
  downloadOrigin: 'api/operational/channel',
};

@Injectable()
export class DownloadOriginService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  getDownloadOrigin() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.downloadOrigin}`);
  }

  downloadOriginCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.downloadOrigin}`, data);
  }

  downloadOriginUpdate(id, data) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.downloadOrigin}/${id}`, data);
  }

  downloadOriginDel(id) {
    return this.httpService.del(`${this.app.pci.BASE_URL}${PATH.downloadOrigin}/${id}`);
  }
}
