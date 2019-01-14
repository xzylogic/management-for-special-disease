import { FormBase, FormType } from './form-base';

export class FormKeyValue extends FormBase<Array<any>> {
  controlType?: FormType = FormType.keyValue;
  options?: {
    key: string,
    value: string,
  }[]
  // type?: string; // 文本框类型（超级不推荐使用date等浏览器支持有限的type类型，慎用！！！）

  constructor(options: FormKeyValue) {
    super(options);
    this.options = options['options'] || [];
  }
}
