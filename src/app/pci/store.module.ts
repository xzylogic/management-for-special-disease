import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { combineReducers } from 'redux';
// import { createLogger } from 'redux-logger';
//
// import { environment } from '../../environments/environment';

import { MainReducer } from './_store/main.reducer';
import { createReducer } from './_store/api/api.reducer';

import { stores as adStores } from './manage-ad';
import { stores as basicDataStores } from './manage-basic-data';
import { stores as commodityStores } from './manage-commodity';
import { stores as dataCollectionStores } from '../shared/manage-data-collection';
import { stores as doctorStores } from './manage-doctor';
import { stores as healthNewsStores } from './manage-health-news';
import { stores as integralStores } from './manage-integral';
import { stores as operationPushStores } from './manage-operation-push';
import { stores as serviceStores } from './manage-service';
import { stores as statisticsStores } from './manage-statistics';
import { stores as userStores } from './manage-user';
import { stores as versionControlStores } from './manage-version-control';
import { stores as wechatStores } from './manage-wechat';

export const rootReducer = combineReducers({
  main: MainReducer,
  doctor: createReducer('doctor', [0, 0, 0], {}),
  ...adStores,
  ...basicDataStores,
  ...commodityStores,
  ...dataCollectionStores,
  ...doctorStores,
  ...healthNewsStores,
  ...integralStores,
  ...operationPushStores,
  ...serviceStores,
  ...statisticsStores,
  ...userStores,
  ...versionControlStores,
  ...wechatStores,
});

@NgModule({
  imports: [NgReduxModule],
})
export class StoreModule {
  constructor(ngRedux: NgRedux<any>) {
    // if (environment.production === true) {
    ngRedux.configureStore(rootReducer, {});
    // } else {
    //   ngRedux.configureStore(rootReducer, {}, [createLogger()]);
    // }
  }
}
