import { Admin, AdminState } from './admin.state';
import { Action } from 'redux';
import { AdminActions } from './admin.action';
// import { DEL_ADMIN, SET_ADMIN } from './admin.action';

export function AdminReducer(state: AdminState = {admin: new Admin()}, action: Action): AdminState {
  switch (action.type) {
    case AdminActions.SET_ADMIN:
      console.log('setadmin');
      return handleSetAdminAction(state, action);
    case AdminActions.DEL_ADMIN:
      return handleDelAdminAction(state, action);
    default:
      return state;
  }
}

function handleSetAdminAction(state: AdminState, action): AdminState {
  const admin = state.admin;
  admin.id = action.payload.id;
  admin.name = action.payload.name;
  return {admin: admin};
}

function handleDelAdminAction(state: AdminState, action): AdminState {
  let admin = state.admin;
  admin = new Admin();
  return {admin: admin};
}
