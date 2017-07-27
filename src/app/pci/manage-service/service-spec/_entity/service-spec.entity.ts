/**
 * Created by zhanglin on 2017/7/25.
 */
export class ServiceSpec {
  id: number;
  name: string;
  specificationIdx: number;
  // specificationName: string;
  price: string;
  count: string;
  serviceId: number;
  serviceName: string;
  operator: string;
  // createdDate: string;
  enable: boolean;
  // enableName: string;
  constructor( obj ?: ServiceSpec) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
    this.specificationIdx = obj && obj.specificationIdx || 0;
    // this.specificationName = obj && obj.specificationName || '';
    this.price = obj && obj.price || '';
    this.count = obj && obj.count || '';
    this.serviceId = obj && obj.serviceId || 1;
    this.serviceName = obj && obj.serviceName || '';
    this.operator = obj && obj.operator || '';
    // this.createdDate = obj && obj.createdDate || '';
    this.enable = obj && obj.enable || null;
    // this.enableName = obj && obj.enableName || '';
  }
}
