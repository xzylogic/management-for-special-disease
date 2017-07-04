import { Action } from '@ngrx/store';
import { Doctor } from './doctor.state';

export const TAB_CHANGE = 'TAB_CHANGE';
export const PAGE0_CHANGE = 'PAGE0_CHANGE';
export const PAGE1_CHANGE = 'PAGE1_CHANGE';
export const PAGE2_CHANGE = 'PAGE2_CHANGE';
export const DOCTOR_CHANGE = 'DOCTOR_CHANGE';

export class TabChangeAction implements Action {
  readonly type = TAB_CHANGE;

  constructor(public payload: number) {
  }
}

export class Page0ChangeAction implements Action {
  readonly type = PAGE0_CHANGE;

  constructor(public payload: number) {
  }
}

export class Page1ChangeAction implements Action {
  readonly type = PAGE1_CHANGE;

  constructor(public payload: number) {
  }
}

export class Page2ChangeAction implements Action {
  readonly type = PAGE2_CHANGE;

  constructor(public payload: number) {
  }
}

export class DoctorChangeAction implements Action {
  readonly type = DOCTOR_CHANGE;

  constructor(public payload: Doctor) {
  }
}
