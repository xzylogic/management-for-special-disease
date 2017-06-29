import { Admin, AdminState } from './admin.state';
import { Action } from '@ngrx/store';
import { DEL_ADMIN, DelAdminAction, SET_ADMIN, SetAdminAction } from './admin.action';

export function AdminReducer(state: AdminState = {admin: new Admin()}, action: Action): AdminState {
  switch (action.type) {
    case SET_ADMIN:
      return handleSetAdminAction(state, <any>action);
    case DEL_ADMIN:
      return handleDelAdminAction(state, <any>action);
    default:
      return state;
  }
}

function handleSetAdminAction(state: AdminState, action: SetAdminAction): AdminState {
  let admin = state.admin;
  admin.id = action.payload.id;
  admin.name = action.payload.name;
  return {admin: admin};
}

function handleDelAdminAction(state: AdminState, action: DelAdminAction): AdminState {
  let admin = state.admin;
  admin = new Admin();
  return {admin: admin};
}
