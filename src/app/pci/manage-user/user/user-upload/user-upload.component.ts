import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { UserService } from '../_service/user.service';
import { UserFormService } from '../_service/user-form.service';
import { User } from '../_entity/user.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html'
})
export class UserUploadComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['user', 'data']) user: Observable<User>;
  errMsg = '';
  form: any;

  constructor(
    private userFormService: UserFormService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.user.subscribe(data => {
      this.containerConfig = this.userService.userUploadConfig();
      this.form = this.userFormService.setUploadForm(data);
    });
  }

  getValues(value) {
      this.userService.userUpload(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/user']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
  }
}
