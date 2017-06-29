import { Action } from '@ngrx/store';
import { InitPayload, TagPayload } from './navigation.state';

export const INIT_NAV: string = 'INIT_NAV';
export const UPDATE_TAG: string = 'UPDATE_TAG';

export class InitNavAction implements Action {
  readonly type = INIT_NAV;

  constructor(public payload: InitPayload) {
  }
}

export class UpdateTagAction implements Action {
  readonly type = UPDATE_TAG;

  constructor(public payload: TagPayload) {
  }
}
