import { FormBase, FormType } from './form-base';

export class FormDate extends FormBase<Date | string> {
  controlType?: FormType = FormType.date;

  constructor(options: FormDate) {
    super(options);
  }
}
