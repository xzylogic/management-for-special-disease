import { Injectable, Inject } from '@angular/core';

const PATH = {
  inspectionCategory: 'record/examination/type',
  inspectionItem: 'record/examination/item'
};

@Injectable()
export class InspectionItemService {

  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService
  ) {
  }

  getInspectionCategories() {
    return this.httpService.get(`${this.api.COMMON_URL}${PATH.inspectionCategory}`);
  }

  getInspectionItems(page: number, size: number, type: number) {
    return this.httpService.get(`${this.api.COMMON_URL}${PATH.inspectionItem}?page=${page}&size=${size}&type=${type}`);
  }

  inspectionItemCreate(data) {
    return this.httpService.post(`${this.api.COMMON_URL}${PATH.inspectionItem}`, data);
  }

  inspectionItemEdit(data) {
    return this.httpService.put(`${this.api.COMMON_URL}${PATH.inspectionItem}/${data.id}`, data);
  }

  inspectionItemDelete(id) {
    return this.httpService.del(`${this.api.COMMON_URL}${PATH.inspectionItem}/${id}`);
  }
}
