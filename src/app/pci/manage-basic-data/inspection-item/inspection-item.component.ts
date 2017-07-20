import { Component, OnInit } from '@angular/core';

import { ContainerConfig, TableOption } from '../../../libs';
import { InspectionItemService } from './_service/inspection-item.service';
import { InspectionItemTableService } from './_service/inspection-item-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-inspection-item',
  templateUrl: 'inspection-item.component.html'
})
export class InspectionItemComponent implements OnInit {
  containerConfig: ContainerConfig;
  inspectionItemTable: TableOption;
  inspectionType: any;

  constructor(
    private inspectionItemService: InspectionItemService,
    private inspectionItemTableService: InspectionItemTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.inspectionItemService.inspectionItemConfig();
    this.inspectionItemTable = new TableOption({
      titles: this.inspectionItemTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getInspectionCategories().subscribe(() => {
      this.getInspectionItems(0);
    }, err => {
      this.inspectionItemTable.loading = false;
      console.log(err);
      this.inspectionItemTable.errorMessage = ERRMSG.netErrMsg;
    })
  }

  getInspectionItems(page) {
    this.inspectionItemTable.reset(page);
    this.inspectionItemService.getInspectionItems(page, this.inspectionItemTable.size, this.inspectionItemTable.queryKey)
      .subscribe(res => {
        this.inspectionItemTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.inspectionItemTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.inspectionItemTable.lists = res.data.content;
          this.inspectionItemTable.totalPage = res.data.totalPages;
        } else {
          this.inspectionItemTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.inspectionItemTable.loading = false;
        console.log(err);
        this.inspectionItemTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getInspectionCategories() {
    return this.inspectionItemService.getInspectionCategories()
      .map(res => {
        if (res.code === 0 && res.data) {
          this.inspectionType = res.data;
          this.inspectionItemTable.queryKey = this.inspectionType[0].id;
        } else {
          this.inspectionItemTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      })
  }

  gotoHandle(data) {
    console.log(data);
    //   if (data.key === 'edit') {
    //     this.inspectionItemData = data.value;
    //     this.enableEdit = true;
    //   }
    //
    //   if (data.key === 'delete') {
    //     // console.log(data.value);
    //     this._inspectionItemService.inspectionItemDelete(data.value.id)
    //       .subscribe(
    //         res => {
    //           if (res.code === 0) {
    //             this.message = '检查子项目删除成功！';
    //             this.enableShow = true;
    //             this.refresh();
    //           } else {
    //             if(res.msg) {
    //               this.message = res.msg;
    //             } else {
    //               this.message = "检查子项目删除失败！";
    //             }
    //             this.enableShow = true;
    //           }
    //         }, err => {
    //           this.message = "啊哦！接口访问出错啦～";
    //           this.enableShow = true;
    //         }
    //       )
    //   }
  }

  newData() {
    //   this.inspectionItemData = null;
    //   this.enableEdit = true;
  }
}
