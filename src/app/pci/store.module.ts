import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { MainReducer } from './_store/main.reducer';
import { combineReducers } from 'redux';
import { createReducer } from './_store/api/api.reducer';

export const rootReducer = combineReducers({
  main: MainReducer,
  doctor: createReducer('doctor', [0, 0, 0], {}),
  data: createReducer('data', [0, 0, 0, 0, 0], {}),
});

@NgModule({
  imports: [NgReduxModule],
})
export class StoreModule {
  constructor(ngRedux: NgRedux<any>) {
    ngRedux.configureStore(rootReducer, {}, [createLogger()]);
  }
}
