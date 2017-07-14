import { Inject, Injectable } from '@angular/core';

const PATH = {
  userActivenessStatistics: 'api/statistics/activity/user', // 患者日活跃度统计
  doctorActivenessStatistics: 'api/statistics/activity/doctor', // 医生日活跃度统计
  userPeriodStatistics: 'api/statistics/login/log/user', // 患者时间段内活跃度统计
  doctorPeriodStatistics: 'api/statistics/login/log/doctor', // 医生时间段内活跃度统计
};

@Injectable()
export class ActivenessStatisticsService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  getUserActiveness(obj: { page: number, size: number, key ?: string, date ?: string }) {
    if (obj.date && !obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.userActivenessStatistics}?date=${obj.date}&page=${obj.page}&size=${obj.size}`
      );
    } else if (!obj.date && obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.userActivenessStatistics}?key=${obj.key}&page=${obj.page}&size=${obj.size}`
      );
    } else if (obj.date && obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.userActivenessStatistics}?key=${obj.key}&date=${obj.date}&page=${obj.page}&size=${obj.size}`
      );
    } else {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.userActivenessStatistics}?page=${obj.page}&size=${obj.size}`
      );
    }
  }

  getDoctorActiveness(obj: { page: number, size: number, key ?: string, date ?: string }) {
    if (obj.date && !obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.doctorActivenessStatistics}?date=${obj.date}&page=${obj.page}&size=${obj.size}`
      );
    } else if (!obj.date && obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.doctorActivenessStatistics}?key=${obj.key}&page=${obj.page}&size=${obj.size}`
      );
    } else if (obj.date && obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.doctorActivenessStatistics}?key=${obj.key}&date=${obj.date}&page=${obj.page}&size=${obj.size}`
      );
    } else {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.doctorActivenessStatistics}?page=${obj.page}&size=${obj.size}`
      );
    }
  }
}
