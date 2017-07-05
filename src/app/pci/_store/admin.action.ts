import { Action, Store } from '@ngrx/store';
import { Admin, AdminState } from './admin.state';
import { Injectable } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
// export const SET_ADMIN = 'SET_ADMIN';
// export const DEL_ADMIN = 'DEL_ADMIN';

export function createAction(type, payload?): Action {
  return {type, payload};
}

@Injectable()
export class AdminActions {
  static SET_ADMIN = 'SET_ADMIN';
  static DEL_ADMIN = 'DEL_ADMIN';

  // constructor(private store: Store<AdminState>) {
  constructor(private ngRedux: NgRedux<AdminState>) {

  }

  set(data) {
    this.ngRedux.dispatch({ type: AdminActions.SET_ADMIN, payload: data });
    // this.store.dispatch(createAction(AdminActions.SET_ADMIN, data));
  }

  get() {
    this.ngRedux.dispatch({ type: AdminActions.DEL_ADMIN });
    // this.store.dispatch(createAction(AdminActions.DEL_ADMIN));
  }

}

// export class SetAdminAction implements Action {
//   readonly type = SET_ADMIN;
//
//   constructor(public payload: Admin) {
//   }
// }
//
// export class DelAdminAction implements Action {
//   readonly type = DEL_ADMIN;
//
//   constructor() {
//   }
// }
