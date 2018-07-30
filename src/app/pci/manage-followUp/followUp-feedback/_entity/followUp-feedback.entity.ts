export class FollowFeedback {
  doctorName: string;
  doctorTel: string;
  userName: string;
  userTel: string;
  followUpDate: string;
  plan: string;
  item: string;
  isFlup: string;
  planDate: string;
  fbDataDtoList: Array<any>;

  constructor(obj?: FollowFeedback) {
    this.doctorName = obj && obj.doctorName || '';
    this.doctorTel = obj && obj.doctorTel || '';
    this.userName = obj && obj.userName || '';
    this.userTel = obj && obj.userTel || '';
    this.followUpDate = obj && obj.followUpDate || '';
    // this.planDate = obj && obj.planDate || '';
    this.fbDataDtoList = obj && obj.fbDataDtoList || [];
  }
}
