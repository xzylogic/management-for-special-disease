import { Inject, Injectable } from '@angular/core';

const PATH = {
  relationship: 'api/relation'
};

@Injectable()
export class RelationshipService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  getRelationships(page, size, keyword, accept) {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.relationship}?page=${page}&size=${size}&keyword=${keyword}&accept=${accept}`
    );
  }
}
