import { Action } from 'redux';
import { IMainState } from './main.state';
import { DelAdminAction, InitNavAction, MainAction, SetAdminAction, UpdateTagAction, SetNavAction, SetTreeAction } from './main.action';
import { NAVBARS } from './static';

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

export function MainReducer(state: IMainState = {
  adminId: 0,
  adminName: '',
  // navigation: NAVBARS,
  navigation: [],
  navTree: {}
}, action: Action): IMainState {
  switch (action.type) {
    case MainAction.SET_ADMIN:
      return handleSetAdminAction(state, <any>action);
    case MainAction.DEL_ADMIN:
      return handleDelAdminAction(state, <any>action);
    case MainAction.SET_TREE:
      return handleSetTreeAction(state, <any>action);
    case MainAction.SET_NAV:
      return handleSetNavAction(state, <any>action);
    case MainAction.INIT_NAV:
      return handleInitNavAction(state, <any>action);
    case MainAction.UPDATE_NAV:
      return handleUpdateTagAction(state, <any>action);
    default:
      return state;
  }
}

function handleSetAdminAction(state: IMainState, action: SetAdminAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.adminId = action.payload.id;
  stateCopy.adminName = action.payload.name;
  return stateCopy;
}

function handleDelAdminAction(state: IMainState, action: DelAdminAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.adminId = 0;
  stateCopy.adminName = '';
  return stateCopy;
}

function handleSetTreeAction(state: IMainState, action: SetTreeAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.navTree = action.payload;
  return stateCopy;
}

function handleSetNavAction(state: IMainState, action: SetNavAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.navigation = action.payload;
  return stateCopy;
}

function handleInitNavAction(state: IMainState, action: InitNavAction): IMainState {
  const stateCopy = __assign(state);
  // stateCopy.navigation.forEach(obj => {
  //   obj.active = false;
  //   obj.open = false;
  //   if (obj.link.replace('/', '') === action.payload.path) {
  //     obj.active = true;
  //   }
  //   if (obj.subBars) {
  //     obj.subBars.forEach(subObj => {
  //       subObj.active = false;
  //       if (subObj.link.replace('/', '') === action.payload.path) {
  //         subObj.active = true;
  //         obj.open = true;
  //       }
  //     });
  //   }
  // });
  if (Array.isArray(stateCopy.navigation)) {
    stateCopy.navigation.forEach(obj => {
      if (obj.sysSubMenus && Array.isArray(obj.sysSubMenus)) {
        obj.sysSubMenus.forEach(subObj => {
          if (action.payload.path.indexOf(subObj.url) > -1) {
            obj.open = true;
          }
        });
      }
    });
  }
  return stateCopy;
}

function handleUpdateTagAction(state: IMainState, action: UpdateTagAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.navigation.map(sidebars => {
    if (sidebars.sysSubMenus) {
      sidebars.sysSubMenus.forEach(subObj => {
        // if (subObj.key === action.payload.key && action.payload.tag !== 0) {
        // console.log(action.payload.tag)
        // console.log(action.payload.key)
        let key = action.payload.key;
        let name = subObj.name;
        if (action.payload.tag !== 0 && (
          (name === '患者订单管理' && key === 'userorder') ||
          (name === '实名认证管理' && key === 'usercertification') ||
          (name === '医生小组管理' && key === 'doctorgroup') ||
          (name === '医生账户列表' && key === 'doctoraccount') ||
          (name === '积分商品订单管理' && key === 'integralOrder'))){
          subObj.tag = action.payload.tag;
          // if (sidebars.key === action.payload.group) {
          //   sidebars.tag = 1;
          // }
        }
      });
    }
  });
  return stateCopy;
}
