import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../libs/_service/http.service';
const PATH = {
  doctorQuery: 'api/doctor/query', // 查询选项列表
  sendMessage: 'doctor/sendMsg', // 编辑短信提醒医生
};

@Injectable()
export class DoctorService {
  constructor(
    @Inject('app') private app,
    private httpSerice: HttpService,
  ) {
  }

  getDoctors(key: string, page: number, size: number, index: number) {
    return this.httpSerice.get(
      `${this.app.pci.BASE_URL}${PATH.doctorQuery}?page=${page}&size=${size}&param=${key}&index=${index}`
    );
  }

  getAuditedDoctors(key: string, page: number, size: number) {
    return this.getDoctors(key, page, size, 1);
  }

  getAuditingDoctors(key: string, page: number, size: number) {
    return this.getDoctors(key, page, size, 2);
  }

  getFailureDoctors(key: string, page: number, size: number) {
    return this.getDoctors(key, page, size, 3);
  }
}
