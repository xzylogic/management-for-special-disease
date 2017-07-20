import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { BasicServiceService } from './_service/basic-service.service';
import { BasicServiceTableService } from './_service/basic-service-table.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-basic-service',
  templateUrl: './basic-service.component.html'
})
export class BasicServiceComponent implements OnInit {
  containerConfig: ContainerConfig;
  basicServiceTable: TableOption;

  constructor(
    private basicServiceService: BasicServiceService,
    private basicServiceTableService: BasicServiceTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.basicServiceService.basicServiceConfig();
    this.basicServiceTable = new TableOption({
      titles: this.basicServiceTableService.setTitles(),
      ifPage: false
    });
    this.getBasicServices();
  }

  getBasicServices() {
    this.basicServiceService.getBasicServices()
      .subscribe(res => {
        this.basicServiceTable.loading = false;
        if (res.data && res.data.length === 0 && res.code === 0) {
          this.basicServiceTable.errorMessage = ERRMSG.nullMsg
        } else if (res.data && res.code === 0) {
          this.basicServiceTable.lists = res.data;
        } else {
          this.basicServiceTable.errorMessage = res.msg || ERRMSG.otherMsg
        }
      }, err => {
        this.basicServiceTable.loading = false;
        console.log(err);
        this.basicServiceTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(data) {
    console.log(data);
    //   if (data.key === 'edit') {
    //     this.basicService = data.value;
    //     this.enableEdit = true;
    //   }
  }

  //
  // handleSuccess(data) {
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.getBasicServices();
  // }
}
