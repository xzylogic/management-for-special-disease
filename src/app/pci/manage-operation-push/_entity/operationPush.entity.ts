export class Operation {
  id: number;
  content: string;
  pushTime: string;
  pushUrl: string;
  type: number;


  constructor(obj?: Operation) {
    this.id = obj && obj.id || 0;
    this.content = obj && obj.content || '';
    this.pushTime = obj && obj.pushTime || '';
    this.pushUrl = obj && obj.pushUrl || '';
    this.type = obj && obj.type || 0;
  }
}
