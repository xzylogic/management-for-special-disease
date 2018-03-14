import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { combineReducers } from 'redux';
// import { createLogger } from 'redux-logger';
//
// import { environment } from '../../environments/environment';

import { MainReducer } from './_store/main.reducer';
import { createReducer } from './_store/api/api.reducer';

import { stores as dataCollectionStores } from '../shared/manage-data-collection';

export const rootReducer = combineReducers({
  main: MainReducer,
  // doctor: createReducer('doctor', [0, 0, 0], {}),
  ...dataCollectionStores,
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
