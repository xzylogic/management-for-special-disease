export class InspectionItem {
  id: number;
  type: any;
  name: string;

  constructor(obj?: InspectionItem) {
    this.id = obj && obj.id || 0;
    this.type = obj && obj.type || '';
    this.name = obj && obj.name || '';
  }
}
