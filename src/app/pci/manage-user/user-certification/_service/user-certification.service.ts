import { Injectable, Inject } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class UserCertificationService {

  constructor(@Inject('admin') private admin, private _apiService: ApiService) {
  }

  getUserCertifications(page: number, size: number) {
    return this._apiService.get(`${PATH.userCertificationList}?page=${page}&size=${size}`);
  }

  getUserUncertifications(page: number, size: number) {
    return this._apiService.get(`${PATH.userUncertificationList}?page=${page}&size=${size}`);
  }

  getUserCertificatings(page: number, size: number) {
    return this._apiService.get(`${PATH.userCertificatingList}?page=${page}&size=${size}`);
  }

  getUserCertificationFailures(page: number, size: number) {
    return this._apiService.get(`${PATH.userCertificationFailureList}?page=${page}&size=${size}`);
  }

  getCertificationCount() {
    return this._apiService.get(`${PATH.userCertificationCount}`);
  }

  getUserCertificationQuery(tel: string) {
    return this._apiService.get(`${PATH.userCertificationQuery}?tel=${tel}`);
  }

}
