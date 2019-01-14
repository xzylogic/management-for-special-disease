import { FormBase, FormType } from './form-base';

export class FormFile extends FormBase<string | string[]> {
  controlType?: FormType = FormType.file;
  size?: number; // 图片大小限制
  url?: string;
  ifCompress?: boolean;
  multiple?: boolean; // 是否多张图片上传 // 暂时未启用图片上传功能
  uploadFiles?: boolean;

  constructor(options: FormFile) {
    super(options);
    this.multiple = options['multiple'] || false;
    this.url = options['url'] || '';
    this.ifCompress = options['ifCompress'] || false;
    if(options['uploadFiles'] === false){
      this.uploadFiles = false
    }else{
      this.uploadFiles = true;
    }
    this.size = options['size'] || null;
  }
}
