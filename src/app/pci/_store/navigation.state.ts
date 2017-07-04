export interface NavState {
  readonly navigation: Sidebar[];
}

export class TagPayload {
  key: string;
  group: string;
  tag: number;
}

export class InitPayload {
  path: string;
}

export class Sidebar {
  key: string;
  title: string;
  link: string;
  tag: number;
  ifSub: boolean;
  active: boolean;
  open: boolean;
  subBars: Sidebar[];

  constructor(obj ?: any) {
    this.key = obj && obj.key || '';
    this.title = obj.title || '';
    this.link = obj.link || '';
    this.tag = obj.tag || null;
    this.open = !!obj.open;
    this.ifSub = !!obj.ifSub;
    this.subBars = obj.subBars || [];
  }
}
