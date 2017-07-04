import { Action } from '@ngrx/store';
import { Doctor, DoctorState } from './doctor.state';
import { DOCTOR_CHANGE, PAGE0_CHANGE, PAGE1_CHANGE, TAB_CHANGE, TabChangeAction } from './doctor.action';

export function DoctorReducer(state: DoctorState = {
  tab: 0,
  tabPage0: 0,
  tabPage1: 0,
  tabPage2: 0,
  doctor: new Doctor()
}, action: Action): DoctorState {
  switch (action.type) {
    case TAB_CHANGE:
      return handleTabChangeAction(state, <any>action);
    case PAGE0_CHANGE:
      return state;
    case PAGE1_CHANGE:
      return state;
    case DOCTOR_CHANGE:
      return state;
    default:
      return state;
  }
}

function handleTabChangeAction(state: DoctorState, action: TabChangeAction) {
  const stateCopy = Object.assign(state);
  stateCopy.tab = action.payload;
  console.log(stateCopy);
  return stateCopy;
}
