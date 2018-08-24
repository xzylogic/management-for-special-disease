export class FollowPlan {
  doctorName: string;
  doctorTel: string;
  userName: string;
  userTel: string;
  createdDate: string;
  fbDataDtoList: Array<any>;

  constructor(obj?: FollowPlan) {
    this.doctorName = obj && obj.doctorName || '';
    this.doctorTel = obj && obj.doctorTel || '';
    this.userName = obj && obj.userName || '';
    this.userTel = obj && obj.userTel || '';
    this.createdDate = obj && obj.createdDate || '';
    this.fbDataDtoList = obj && obj.fbDataDtoList || [];
  }
}
