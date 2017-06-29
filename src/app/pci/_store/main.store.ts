import { NavReducer } from './navigation.reducer';
import { AdminReducer } from './admin.reducer';
import { NavState } from './navigation.state';
import { AdminState } from './admin.state';

export const MainStore = {
  NavReducer,
  AdminReducer
};

export class MainState {
  NavReducer: NavState;
  AdminReducer: AdminState;
}
