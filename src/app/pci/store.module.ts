import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import { MainReducer } from './_store/main.reducer';
import { createReducer } from './_store/api/api.reducer';

export const rootReducer = combineReducers({
  main: MainReducer,
  doctor: createReducer('doctor', [0, 0, 0], {}),
  adDoctor: createReducer('adDoctor', [0], {}),
  adPatient: createReducer('adPatient', [0], {}),
});

@NgModule({
  imports: [NgReduxModule],
})
export class StoreModule {
  constructor(ngRedux: NgRedux<any>) {
    ngRedux.configureStore(rootReducer, {}, [createLogger()]);
  }
}
