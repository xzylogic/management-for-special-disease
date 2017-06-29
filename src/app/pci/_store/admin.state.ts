export class Admin {
  id: string;
  name: string;

  constructor(id?: string, name?: string) {
    this.id = id || '';
    this.name = name || ''
  }
}
export interface AdminState {
  readonly admin: Admin;
}
