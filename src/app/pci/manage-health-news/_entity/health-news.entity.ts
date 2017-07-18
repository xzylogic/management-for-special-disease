export class HealthNews {
  id: number;
  articleTypeId: number;
  imageUrl: string;
  title: string;
  content: string;
  link: string;
  ranking: string;
  typeList: any;

  constructor(typeList, obj?: HealthNews) {
    this.id = obj && obj.id || 0;
    this.articleTypeId = obj && obj.articleTypeId || null;
    this.imageUrl = obj && obj.imageUrl || '';
    this.title = obj && obj.title || '';
    this.content = obj && obj.content || '';
    this.link = obj && obj.link || '';
    this.ranking = obj && obj.ranking || '';
    this.typeList = typeList;
  }
}
