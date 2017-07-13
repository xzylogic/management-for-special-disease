import { Component, OnInit } from '@angular/core';
import { VersionControlService } from './_service/version-control.service';
import { VersionControlTableService } from './_service/version-control-table.service';

@Component({
  selector: 'app-version-control',
  templateUrl: 'version-control.component.html'
})
export class VersionControlComponent implements OnInit {
  // title = '版本信息管理';
  // subTitle = '版本信息列表';
  //
  // versionControlTable: TableOption = new TableOption();
  //
  // versionControl: any;
  // enableEdit: boolean;
  //
  // message: string;
  // enableShow: boolean;

  constructor(
    private _versionControlService: VersionControlService,
    private _versionControlTableService: VersionControlTableService
  ) {}

  ngOnInit() {
    // this.getVersionControlTitles();
    // this.getVersionControls(0);
  }

  // getVersionControlTitles() {
  //   this.versionControlTable.titles = this._versionControlTableService.setTitles();
  // }
  //
  // getVersionControls(page: number) {
  //   this.versionControlTable.currentPage = page;
  //   this._versionControlService.getVersionControls(page, this.versionControlTable.size)
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.versionControlTable.totalPage = data.data.totalPages;
  //           this.versionControlTable.lists = data.data.content;
  //         }
  //       })
  // }
  //
  // gotoHandle(data) {
  //   if (data.key === 'edit') {
  //     this.versionControl = data.value;
  //     this.enableEdit = true;
  //   }
  // }
  //
  // newVersionControl() {
  //   this.versionControl = null;
  //   this.enableEdit = true;
  // }
  //
  // handleSuccess(data) {
  //   this.message = data;
  //   this.enableShow = true;
  //   this.getVersionControls(0);
  // }
}
