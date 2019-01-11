import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import {FormBase} from "../../../../libs/dform/_entity/form-base";
import {FormText} from "../../../../libs/dform/_entity/form-text";
import {FormTextarea} from "../../../../libs/dform/_entity/form-textarea";
import {FormTree} from "../../../../libs/dform/_entity/form-tree";
import {FormRadio} from "../../../../libs/dform/_entity/form-radio";

const PATH = {
  getTemplate: 'opt/sms/getTemplate', // 短信模板获取
  enable: 'opt/sms/enable',    // 启用、禁用
  addTemplate: 'opt/sms/addTemplate',    // 编辑短信模板
};
@Injectable()
export class SmsModelService {

  smsData: any;
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }


  smsModelConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '短信管理',
      subTitle: '短信模板管理',
      ifHome: true,
      homeRouter: '/sms-model',
      currentRouter: '/sms-model'
    });
  }

  setSmsModelConfig(flag) {
    return new ContainerConfig({
      title: '短信管理',
      subTitle: flag ? '配置短信' : '配置短信',
      ifHome: false,
      homeRouter: '/sms-model',
      currentRouter: '/sms-model/config',
    });
  }

  setSmsModelForm(data?, id?) {
    // console.log(data)
    let templateId, description, content;
    if(data){
      templateId = data.templateId || '';
      description = data.description || '';
      content = data.content || '';
    }
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'templateId',
        label: '模板ID',
        value: templateId || '',
        required: true,
        errMsg: '请填写模板ID(6位数)'
      })
    );
    forms.push(
      new FormText({
        key: 'description',
        label: '描述',
        value: description || '',
        required: true,
        errMsg: '请填写描述'
      })
    );
    forms.push(
      new FormTextarea({
        key: 'content',
        label: '内容',
        value: content || '',
        required: true,
        errMsg: '请填写内容'
      })
    );
    return forms;
  }
  /**
   * 获取患者用药提醒列表
   * @param {number} page    [description]
   * @param {string} param   [搜索参数，姓名/手机号]
   * @param {string} standard   [状态，0正常，1异常]
   * @param {string} standard   [闹钟，0正常，1异常]
   */
  getData(page: number, size: number, keyword?: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.getTemplate}?page=${page}&size=${size}&param=${keyword}`);
  }

  enableSmsModel(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.enable}?templateId=${id}`);
  }

  addTemplate(data) {
    // console.log(data);
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.addTemplate}`, data);
  }
}
