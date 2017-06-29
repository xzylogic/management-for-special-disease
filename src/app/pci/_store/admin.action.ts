import { Action } from '@ngrx/store';
import { Admin } from './admin.state';
export const SET_ADMIN: string = 'SET_ADMIN';
export const DEL_ADMIN: string = 'DEL_ADMIN';

export class SetAdminAction implements Action {
  readonly type = SET_ADMIN;

  constructor(public payload: Admin) {
  }
}

export class DelAdminAction implements Action {
  readonly type = DEL_ADMIN;

  constructor() {
  }
}
