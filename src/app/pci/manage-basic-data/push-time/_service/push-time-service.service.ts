import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class PushTimeService {

  constructor(private _apiService: ApiService) {
  }

  getPushTime() {
    return this._apiService.get(`${PATH.pushTime}`);
  }

  PushTimeEdit(data) {
    return this._apiService.postParma(`${PATH.pushTimeEdit}?pushTime=${data}`);
  }

}
