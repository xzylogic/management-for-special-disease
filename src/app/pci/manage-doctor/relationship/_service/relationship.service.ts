import { Injectable } from '@angular/core';
import { ApiService } from "../../../_services/api";

const PATH = {
  relationship: 'api/relation'
};

@Injectable()
export class RelationshipService {

  constructor(private _apiService: ApiService) {
  }

  getRelationships(page, size, keyword, accept) {
    return this._apiService.get(`${PATH.relationship}?page=${page}&size=${size}&keyword=${keyword}&accept=${accept}`);
  }

}
