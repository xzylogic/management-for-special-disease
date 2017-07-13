import { Injectable, Inject } from '@angular/core';

const PATH = {
  inspectionCategory: 'record/examination/type'
};

@Injectable()
export class InspectionCategoryService {

  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService
  ) {
  }

  getInspectionCategories() {
    return this.httpService.get(`${this.api.COMMON_URL}${PATH.inspectionCategory}`);
  }

  inspectionCategoryCreate(data) {
    return this.httpService.post(`${this.api.COMMON_URL}${PATH.inspectionCategory}`, data);
  }

  inspectionCategoryEdit(data) {
    return this.httpService.put(`${this.api.COMMON_URL}${PATH.inspectionCategory}/${data.id}`, data);
  }

  inspectionCategoryDelete(id) {
    return this.httpService.del(`${this.api.COMMON_URL}${PATH.inspectionCategory}/${id}`);
  }
}
