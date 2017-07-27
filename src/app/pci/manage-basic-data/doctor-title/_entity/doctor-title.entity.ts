/**
 * Created by zhanglin on 2017/7/18.
 */
export class DoctorTitle {
  id: number;
  name: string;
  constructor(obj?: DoctorTitle) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
  }
}
