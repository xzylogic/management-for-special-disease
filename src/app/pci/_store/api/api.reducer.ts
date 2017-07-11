import { Action } from 'redux';
import { IApiState } from './api.state';
import {
  ApiAction, DataChangeAction,
  PageChangeAction, TabChangeAction
} from './api.action';

export function createReducer(key, initPage: Array<number>, initData: any) {
  return function apiReducer(state: IApiState<any> = {
    tab: 0,
    page: initPage,
    data: initData
  }, action: Action): IApiState<any> {
    switch (action.type) {
      case ApiAction.TAB_CHANGE + key:
        return handleTabChangeAction(state, <any>action);
      case ApiAction.PAGE_CHANGE + key:
        return handlePageChangeAction(state, <any>action);
      case ApiAction.DATA_CHANGE + key:
        return handleDataChangeAction(state, <any>action);
      default:
        return state;
    }
  }
}

function handleTabChangeAction(state: IApiState<any>, action: TabChangeAction) {
  const stateCopy = Object.assign(state);
  stateCopy.tab = action.payload;
  return stateCopy;
}

function handlePageChangeAction(state: IApiState<any>, action: PageChangeAction) {
  const stateCopy = Object.assign(state);
  stateCopy.page = action.payload;
  return stateCopy;
}

function handleDataChangeAction(state: IApiState<any>, action: DataChangeAction) {
  const stateCopy = Object.assign(state);
  stateCopy.data = action.payload;
  return stateCopy;
}
