import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { MainReducer } from './_store/main.reducer';
import { combineReducers } from 'redux';
import { reducer as doctorReducer } from './manage-doctor/index';

export const rootReducer = combineReducers({
  main: MainReducer,
  ...doctorReducer
});

@NgModule({
  imports: [NgReduxModule],
})
export class StoreModule {
  constructor(ngRedux: NgRedux<any>) {
    ngRedux.configureStore(rootReducer, {}, [createLogger()]);
  }
}
