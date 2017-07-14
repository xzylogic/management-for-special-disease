import { Injectable, Inject } from '@angular/core';

const PATH = {
  inspectionCategory: 'record/examination/type'
};

@Injectable()
export class InspectionCategoryService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  getInspectionCategories() {
    return this.httpService.get(`${this.app.COMMON_URL}${PATH.inspectionCategory}`);
  }

  inspectionCategoryCreate(data) {
    return this.httpService.post(`${this.app.COMMON_URL}${PATH.inspectionCategory}`, data);
  }

  inspectionCategoryEdit(data) {
    return this.httpService.put(`${this.app.COMMON_URL}${PATH.inspectionCategory}/${data.id}`, data);
  }

  inspectionCategoryDelete(id) {
    return this.httpService.del(`${this.app.COMMON_URL}${PATH.inspectionCategory}/${id}`);
  }
}
