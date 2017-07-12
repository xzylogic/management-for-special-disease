import { Injectable, Inject } from '@angular/core';

const PATH = {
  discomfortTypeList: '/api/symptomType/list', // 不适症状类型列表
  discomfortList: 'api/symptom/list', // 不适症状列表
  discomfortCreate: 'api/symptom/save', // 新增不适症状
  discomfortEdit: 'api/symptom/update', // 修改不适症状
  discomfortDelete: 'api/symptom/delete' // 删除不适症状
};

@Injectable()
export class DiscomfortSymptomService {

  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取不适症状类型列表
   */
  getDiscomfortSymptomType() {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.discomfortTypeList}`);
  }

  /**
   * 获取不适症状列表
   * @param {[type]} id   [description]
   */
  getDiscomfortSymptoms(id) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.discomfortList}?symptomTypeId=${id}`);
  }

  /**
   * 新建不适症状
   * @param {[type]} data [description]
   */
  discomfortSymptomCreate(data) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.discomfortCreate}`, data);
  }

  /**
   * 编辑不适症状
   * @param {[type]} data [description]
   */
  discomfortSymptomEdit(data) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.discomfortEdit}`, data);
  }
}
