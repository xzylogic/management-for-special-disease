import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { UserService } from './_service/user.service';
import { UserTableService } from './_service/user-table.service';
import { User } from './_entity/user.entity';
import { TableOption, ContainerConfig } from '../../../libs';
import { ERRMSG } from '../../_store/static';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  containerConfig: ContainerConfig;
  userTable: TableOption;
  queryBind: any;
  @select(['user', 'tab']) tab: Observable<number>;
  @select(['user', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private userService: UserService,
    private userTableService: UserTableService,
    private router: Router
  ) {
     action.dataChange('user', new User());
  }

  ngOnInit() {
    this.containerConfig = this.userService.userConfig();
    this.userTable = new TableOption({
      titles: this.userTableService.setUserTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.userTable.queryKey = '';
    this.queryBind = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUsers(page[0]);
    });
  }

  getUsers(page: number) {
    this.action.pageChange('user', [page]);
    this.userTable.reset(page);
    this.userService.getUsers(
      this.userTable.queryKey, this.queryBind, page, this.userTable.size)
      .subscribe(res => {
        this.userTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.userTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.userTable.totalPage = res.data.totalPages;
          // this.userTable.totalElements = data.data.totalElements;
          this.formatUser(res.data.content);
          this.userTable.lists = res.data.content;
        } else {
          this.userTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.userTable.loading = false;
        this.userTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  change(index) {
    this.action.tabChange('user', index);
  }


  // 转换
  formatUser(list: Array<any>) {
    list.forEach(data => {
      // data.hospitalId = data.hospital && data.hospital.id || '';
      // data.hospitalName = data.hospital && data.hospital.name || '';
      if (data.sex === 0) {
        data.sexName = '男';
      }
      if (data.sex === 1) {
        data.sexName = '女';
      }
    })
  }

  newData() {
    this.action.dataChange('user', new User());
    this.router.navigate(['/user/edit']);
  }

  gotoHandle(res) {
    const user = <User>res.value;
    if (res.key === 'integral') {
      this.action.dataChange('user', user);
      this.router.navigate(['/user/integral']);
    }
    if (res.key === 'edit') {
      this.action.dataChange('user', user);
      this.router.navigate(['/user/edit']);
    }
  }


  // // 获取医院下拉框选项
  // getHospitals() {
  //   this._userService.getOptions()
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.hospitalTable.lists = data.data.content;
  //         }
  //       })
  // }
  //
  // gotoHandle(data) {
  //   if (data.key == 'edit') {
  //     this.user = data.value;
  //     this.enableEdit = true;
  //   } else if (data.key == 'integral') {
  //     this.integral = data;
  //     this.enableDetail = true;
  //   }
  // }
  //
  // newUser() {
  //   this.user = null;
  //   this.enableEdit = true;
  // }
  //
  // handleSuccess(data) {
  //   this.message = data;
  //   this.enableShow = true;
  //   this.getUsers(0);
  // }
  //
  // getSex(sex) {
  //   if (sex === 0) {
  //     return '男';
  //   }
  //   if (sex === 1) {
  //     return '女';
  //   }
  //   return null;
  // }
  //
  // //打印excel;
  // doctorVia(data) {
  //   var size = 0;
  //   let maxSize = Math.ceil(data / 200);
  //   if (data <= 200) {
  //     this.getUserLists(size);
  //     this.success = true;
  //   } else {
  //     this.timer = setInterval(() => {
  //       this.getUserLists(size);
  //       this.page = size;
  //       size++;
  //       if (size == maxSize) {
  //         clearInterval(this.timer);
  //         this.success = true;
  //       }
  //     }, 200);
  //   }
  // }
  //
  // //分批次请求数据
  // getUserLists(page) {
  //   this._userService.getUsers(this.queryKey, this.queryBind, page, 200)
  //     .subscribe(
  //       data => {
  //         for (var i = 0; i < data.data.content.length; ++i) {
  //           this.lists.push(data.data.content[i]);
  //         }
  //         this.userAllTable.lists = this.lists;
  //         this.formatUser(data.data.content);
  //         for (let i = 0; i < this.userAllTable.lists.length; ++i) {
  //           this.userAllTable.lists[i].lastOperationDate = this.getDate(this.userAllTable.lists[i].lastOperationDate);
  //         }
  //       })
  // }
  //
  // export() {
  //   let count = this.totalElements
  //   this.exportShow = true;
  //   this.success = false;
  //   this.doctorVia(count);
  // }
  //
  // doctorExcel() {
  //   $('.userExcel').on('click', function () {
  //     let myDate = new Date();
  //     let $this = $(this);
  //     let table = $('#table')[0];
  //     $this.attr('download', '全程心管家患者信息列表-' + myDate.toLocaleDateString() + '.xls');
  //     ExcellentExport.excel(this, table);
  //   });
  // }
  //
  // close() {
  //   this.exportShow = !this.exportShow;
  // }
}
