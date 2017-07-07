import { Injectable, Inject } from '@angular/core';

import { HttpService } from '../../libs/_service/http.service';
import { MainAction } from '../_store/main.action';

@Injectable()
export class NavigationService {

  constructor(
    @Inject('app') private app,
    private httpService: HttpService,
    private mainAction: MainAction
  ) {
  }

  // getUserName(): Observable<string> {
    // return this.store$.select(state => state.AdminReducer && state.AdminReducer.admin && state.AdminReducer.admin.name || '');
  // }

  // getSidebars(): Observable<Sidebar[]> {
    // return this.store$.select(state => state.NavReducer && state.NavReducer.navigation);
  // }

  initSidebars(path) {
    this.mainAction.initNav({path: path});
    // this.store$.dispatch(new InitNavAction({path: path}));
  }

  setCount(tag, group, key) {
    this.mainAction.updateNav({key: key, group: group, tag: tag})
    // this.store$.dispatch(new UpdateTagAction({key: key, group: group, tag: tag}));
  }

  // setNavCount(count: TagPayload) {
  //   // this.store$.dispatch(new UpdateTagAction(count));
  // }

}
