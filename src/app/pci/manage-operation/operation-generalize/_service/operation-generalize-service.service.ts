import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import {FormBase} from "../../../../libs/dform/_entity/form-base";
import {FormRadio} from "../../../../libs/dform/_entity/form-radio";
import {FormText} from "../../../../libs/dform/_entity/form-text";
import {FormKeyValue} from "../../../../libs/dform/_entity/form-keyValue";
import {FormFile} from "../../../../libs/dform/_entity/form-file";
import {FormDate} from "../../../../libs/dform/_entity/form-date";

const PATH = {
  operationSendSMS: 'opt/spread/sendMessage', // 发送短信消息
  operationSendMicro: 'opt/spread/sendMicro', // 发送微信消息
};

@Injectable()
export class OperationGeneralizeService {

  smsUrl: string = `${this.app.pci.BASE_URL}${PATH.operationSendSMS}`;
  microUrl: string = `${this.app.pci.BASE_URL}${PATH.operationSendMicro}`;
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  operationGeneralizeConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '运营推广管理',
      subTitle: '运营推广',
      ifHome: true,
      homeRouter: '/operation-generalize',
      currentRouter: '/operation-generalize'
    });
  }

  setSMSForm() {
    // console.log(data)

    const hasApp = [{'id': 1, 'name': '是'},{'id': 2, 'name': '否'}];
    const hasSms = [{'id': 1, 'name': '是'},{'id': 2, 'name': '否'}];
    const type = [{'id': 1, 'name': '医生端'},{'id': 2, 'name': '患者端'}];
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'templateId',
        label: '模板ID',
        value: '',
        required: true,
        // maxlength: 6,
        errMsg: '请填写模板ID'
      })
    );
    forms.push(
      new FormRadio({
        key: 'hasApp',
        label: 'App推送',
        value: '',
        required: true,
        options: hasApp || [],
        errMsg: '请选择App推送'
      })
    );
    forms.push(
      new FormRadio({
        key: 'hasSms',
        label: '短信推送',
        value: '',
        required: true,
        options: hasSms || [],
        errMsg: '请选择短信推送'
      })
    );
    forms.push(
      new FormRadio({
        key: 'type',
        label: '类型',
        value: '',
        required: true,
        options: type || [],
        errMsg: '请选择类型'
      })
    );
    forms.push(
      new FormFile({
        key: 'file',
        label: '文件上传',
        value: '',
        required: true,
        uploadFiles: false,
        errMsg: '请选择文件'
      })
    );
    forms.push(
      new FormKeyValue({
        key: 'args',
        label: '模板参数及值',
        value: [],
        // required: true,
        errMsg: '请填写模板参数及值'
      })
    );
    return forms;
  }

  setMicroForm() {
    // console.log(data)

    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'title',
        label: '标题',
        value: '',
        required: true,
        errMsg: '请填写标题'
      })
    );
    forms.push(
      new FormDate({
        key: 'date',
        label: '活动日期',
        value: '',
        required: true,
        errMsg: '请填写日期'
      })
    );
    forms.push(
      new FormText({
        key: 'content',
        label: '活动内容',
        value: '',
        required: true,
        errMsg: '请填写内容'
      })
    );
    forms.push(
      new FormText({
        key: 'address',
        label: '活动地址',
        value: '',
        required: true,
        errMsg: '请填写地址'
      })
    );
    forms.push(
      new FormText({
        key: 'url',
        label: '活动链接',
        value: '',
        errMsg: '请填写网址'
      })
    );
    forms.push(
      new FormFile({
        key: 'file',
        label: '文件上传',
        value: '',
        required: true,
        uploadFiles: false,
        errMsg: '请选择文件'
      })
    );
    return forms;
  }

  // operationGeneralizeEditConfig(tag: boolean): ContainerConfig {
  //   return new ContainerConfig({
  //     title: '运营推广管理',
  //     subTitle: tag ? '新增推广' : '编辑推广',
  //     ifHome: false,
  //     homeRouter: '/operation-generalize',
  //     currentRouter: '/operation-generalize/edit'
  //   });
  // }

  // /**
  //  * 新增修改推送
  //  */
  // operationSendSMS(params, data) {
  //   return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.operationSendSMS}?${params}`, data);
  // }
  //
  // operationSendMicro(params, data) {
  //   return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.operationSendMicro}?${params}`, data);
  // }
}
