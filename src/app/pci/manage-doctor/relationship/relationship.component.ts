import { Component, OnInit, AfterViewInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { RelationshipService } from './_service/relationship.service';
import { RelationshipTableService } from './_service/relationship-table.service';

@Component({
  selector: 'app-relationship',
  templateUrl: 'relationship.component.html'
})
export class RelationshipComponent implements OnInit, AfterViewInit {
  // title = '医患关联管理';
  // subTitle = '医患关联列表';
  //
  // relationshipTable: TableOption = new TableOption();
  //
  // queryKey: string = '';
  // queryStatus: boolean | string = '';

  constructor(
    private _relationshipService: RelationshipService,
    private _relationshipTableService: RelationshipTableService
  ) {
  }

  ngOnInit() {
    // this.getRelationshipTitles();
    // this.getRelationships(0);
  }

  ngAfterViewInit() {
    // $('#list').dropdown();
  }

  // refresh() {
  //   this.queryKey = '';
  //   this.queryStatus = '';
  //   $('.text').text('申请状态');
  //   $('.text').addClass('default');
  //   this.getRelationships(0);
  // }
  //
  // getRelationshipTitles() {
  //   this.relationshipTable.titles = this._relationshipTableService.setTitles();
  // }
  //
  // getRelationships(page) {
  //   this.relationshipTable.lists = null;
  //   this.relationshipTable.loading = true;
  //   this.relationshipTable.errorMessage = '';
  //   this.relationshipTable.currentPage = page;
  //   this._relationshipService.getRelationships(page, this.relationshipTable.size, this.queryKey, this.queryStatus)
  //     .subscribe(
  //       res => {
  //         this.relationshipTable.loading = false;
  //         if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
  //           this.relationshipTable.errorMessage = "该数据为空哦～";
  //         } else if (res.data && res.data.content && res.code === 0) {
  //           this.relationshipTable.totalPage = res.data.totalPages;
  //           this.relationshipTable.lists = res.data.content;
  //         } else {
  //           this.relationshipTable.errorMessage = res.msg || "空空如也～";
  //         }
  //       }, err => {
  //         this.relationshipTable.loading = false;
  //         this.relationshipTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
}
