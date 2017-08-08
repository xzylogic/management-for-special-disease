export class Coupon {
  couponId: number;
  name: string;
  fullPrice: string;
  price: string;
  code: string;
  surplusNum: string;
  assignUser: boolean;
  useRange: string;
  organizationId: number;
  startDate: string;
  endDate: string;
  newSurplusNum: string;

  constructor(obj?: Coupon) {
    this.couponId = obj && obj.couponId || 0;
    this.name = obj && obj.name || '';
    this.fullPrice = obj && obj.fullPrice || '';
    this.price = obj && obj.price || '';
    this.code = obj && obj.code || '';
    this.surplusNum = obj && obj.surplusNum || '';
    this.assignUser = obj && obj.assignUser || null;
    this.useRange = obj && obj.useRange || '';
    this.organizationId = obj && obj.organizationId || 0;
    this.startDate = obj && obj.startDate || '';
    this.endDate = obj && obj.endDate || '';
    this.newSurplusNum = obj && obj.newSurplusNum || '';
  }
}
