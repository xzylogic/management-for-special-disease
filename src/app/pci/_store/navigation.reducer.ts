import { Action } from '@ngrx/store';
import {
  INIT_NAV, InitNavAction,
  UPDATE_TAG, UpdateTagAction
} from './navigation.action';
import { NavState, Sidebar } from './navigation.state';
import { SIDEBARS } from './static';

export function NavReducer(state: NavState = {navigation: SIDEBARS}, action: Action): NavState {
  switch (action.type) {
    case INIT_NAV:
      console.log('initnav');
      return handleInitNavAction(state, <any>action);
    case UPDATE_TAG:
      return handleUpdateTagAction(state, <any>action);
    default:
      return state;
  }
}

function handleInitNavAction(state: NavState, action: InitNavAction): NavState {
  let nav: Sidebar[];
  nav = state.navigation;
  nav.forEach(obj => {
    obj.active = false;
    obj.open = false;
    if (obj.link.replace('/', '') === action.payload.path) {
      obj.active = true;
    }
    if (obj.subBars) {
      obj.subBars.forEach(subObj => {
        subObj.active = false;
        if (subObj.link.replace('/', '') === action.payload.path) {
          subObj.active = true;
          obj.open = true;
        }
      });
    }
  });
  return {navigation: nav};
}

function handleUpdateTagAction(state: NavState, action: UpdateTagAction): NavState {
  let nav: Sidebar[];
  nav = state.navigation;
  nav.map(sidebars => {
    if (sidebars.subBars) {
      sidebars.subBars.forEach(subObj => {
        if (subObj.key === action.payload.key && action.payload.tag !== 0) {
          subObj.tag = action.payload.tag;
          if (sidebars.key === action.payload.group) {
            sidebars.tag = 1;
          }
        }
      });
    }
  });
  return {navigation: nav};
}
