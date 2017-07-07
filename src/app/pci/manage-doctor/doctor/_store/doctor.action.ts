import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { Doctor, IDoctorState } from './doctor.state';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class DoctorAction {
  static TAB_CHANGE = 'TAB_CHANGE';
  static PAGE0_CHANGE = 'PAGE0_CHANGE';
  static PAGE1_CHANGE = 'PAGE1_CHANGE';
  static PAGE2_CHANGE = 'PAGE2_CHANGE';
  static DOCTOR_CHANGE = 'DOCTOR_CHANGE';
  static DOCTOR_RESET = 'DOCTOR_RESET';

  constructor(private ngRedux: NgRedux<IDoctorState>) {
  }

  tabChange(tab: number) {
    console.log(new TabChangeAction(tab));
    this.ngRedux.dispatch({type: DoctorAction.TAB_CHANGE, payload: tab});
  }

  page0Change(page: number) {
    this.ngRedux.dispatch({type: DoctorAction.PAGE0_CHANGE, payload: page});
  }

  page1Change(page: number) {
    this.ngRedux.dispatch({type: DoctorAction.PAGE1_CHANGE, payload: page});
  }

  page2Change(page: number) {
    this.ngRedux.dispatch({type: DoctorAction.PAGE0_CHANGE, payload: page});
  }

  doctorChange(doctor: Doctor) {
    this.ngRedux.dispatch({type: DoctorAction.DOCTOR_CHANGE, payload: doctor});
  }

  doctorReset() {
    this.ngRedux.dispatch({type: DoctorAction.DOCTOR_RESET});
  }
}

export class TabChangeAction implements Action {
  readonly type = DoctorAction.TAB_CHANGE;
  // readonly payload = DoctorAction.TAB_CHANGE;

  constructor(public payload: number) {
  }
}

export class Page0ChangeAction implements Action {
  readonly type = DoctorAction.PAGE0_CHANGE;

  constructor(public payload: number) {
  }
}

export class Page1ChangeAction implements Action {
  readonly type = DoctorAction.PAGE1_CHANGE;

  constructor(public payload: number) {
  }
}

export class Page2ChangeAction implements Action {
  readonly type = DoctorAction.PAGE2_CHANGE;

  constructor(public payload: number) {
  }
}

export class DoctorChangeAction implements Action {
  readonly type = DoctorAction.DOCTOR_CHANGE;

  constructor(public payload: Doctor) {
  }
}

export class DoctorResetAction implements Action {
  readonly type = DoctorAction.DOCTOR_RESET;
}

