import { Action } from 'redux';
import { Doctor, IDoctorState } from './doctor.state';
import { DoctorAction, DoctorChangeAction, DoctorResetAction, TabChangeAction } from './doctor.action';

export function DoctorReducer(state: IDoctorState = {
  tab: 0,
  tabPage0: 0,
  tabPage1: 0,
  tabPage2: 0,
  doctor: new Doctor()
}, action: Action): IDoctorState {
  switch (action.type) {
    case DoctorAction.TAB_CHANGE:
      return handleTabChangeAction(state, <any>action);
    case DoctorAction.PAGE0_CHANGE:
      return state;
    case DoctorAction.PAGE1_CHANGE:
      return state;
    case DoctorAction.PAGE2_CHANGE:
      return state;
    case DoctorAction.DOCTOR_CHANGE:
      return handleDoctorChangeAction(state, <any>action);
    case DoctorAction.DOCTOR_RESET:
      return handleDoctorResetAction(state, <any>action);
    default:
      return state;
  }
}

function handleTabChangeAction(state: IDoctorState, action: TabChangeAction) {
  const stateCopy = Object.assign(state);
  stateCopy.tab = action.payload;
  return stateCopy;
}

function handleDoctorChangeAction(state: IDoctorState, action: DoctorChangeAction) {
  const stateCopy = Object.assign(state);
  stateCopy.doctor = action.payload;
  return stateCopy;
}

function handleDoctorResetAction(state: IDoctorState, action: DoctorResetAction) {
  const stateCopy = Object.assign(state);
  stateCopy.doctor = new Doctor();
  return stateCopy;
}
