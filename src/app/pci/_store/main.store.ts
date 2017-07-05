import { NavReducer } from './navigation.reducer';
import { AdminReducer } from './admin.reducer';
import { NavState } from './navigation.state';
import { AdminState } from './admin.state';
import { DoctorReducer } from '../manage-doctor/doctor/_store/doctor.reducer';
import { DoctorState } from '../manage-doctor/doctor/_store/doctor.state';

export const MainStore = {
  NavReducer,
  // AdminReducer,
  // DoctorReducer
};

export class MainState {
  NavReducer: NavState;
  // AdminReducer: AdminState;
  // DoctorReducer: DoctorState;
}
