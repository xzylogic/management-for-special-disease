import { FormBase, FormType } from './form-base';

export class FormDropdown extends FormBase<any> {
  controlType?: FormType = FormType.dropdown;
  options: {
    id: string, // 值
    name: string // 显示名称
  }[];

  constructor(options: FormDropdown) {
    super(options);
    this.options = options['options'] || [];
  }
}
