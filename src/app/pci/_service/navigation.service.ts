import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { HttpService } from '../../libs/_service/http.service';
import { Sidebar, TagPayload } from '../_store/navigation.state';
import { InitNavAction, UpdateTagAction } from '../_store/navigation.action';
import { MainState } from '../_store/main.store';
import { AdminActions } from '../_store/admin.action';

@Injectable()
export class NavigationService {

  constructor(
    @Inject('app') private app,
    private httpService: HttpService,
    private store$: Store<MainState>,
    private adminAction: AdminActions
  ) {
  }

  // getUserName(): Observable<string> {
    // return this.store$.select(state => state.AdminReducer && state.AdminReducer.admin && state.AdminReducer.admin.name || '');
  // }

  getSidebars(): Observable<Sidebar[]> {
    return this.store$.select(state => state.NavReducer && state.NavReducer.navigation);
  }

  initSidebars(path) {
    this.store$.dispatch(new InitNavAction({path: path}));
  }

  setCount(tag, group, key) {
    this.store$.dispatch(new UpdateTagAction({key: key, group: group, tag: tag}));
  }

  setNavCount(count: TagPayload) {
    this.store$.dispatch(new UpdateTagAction(count));
  }

}
