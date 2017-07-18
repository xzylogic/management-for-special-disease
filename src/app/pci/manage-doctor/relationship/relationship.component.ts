import { Component, OnInit } from '@angular/core';

import { TableOption, ContainerConfig } from '../../../libs';
import { RelationshipService } from './_service/relationship.service';
import { RelationshipTableService } from './_service/relationship-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html'
})
export class RelationshipComponent implements OnInit {
  containerConfig: ContainerConfig;
  relationshipTable: TableOption = new TableOption();
  queryStatus: any;

  constructor(
    private relationshipService: RelationshipService,
    private relationshipTableService: RelationshipTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.relationshipService.relationshipConfig();
    this.relationshipTable = new TableOption({
      titles: this.relationshipTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.relationshipTable.queryKey = '';
    this.getRelationships(0);
  }

  getRelationships(page) {
    this.relationshipTable.reset(page);
    this.relationshipService.getRelationships(page, this.relationshipTable.size, this.relationshipTable.queryKey, this.queryStatus)
      .subscribe(
        res => {
          this.relationshipTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.relationshipTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.relationshipTable.totalPage = res.data.totalPages;
            this.relationshipTable.lists = res.data.content;
          } else {
            this.relationshipTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.relationshipTable.loading = false;
          console.log(err);
          this.relationshipTable.errorMessage = ERRMSG.netErrMsg;
        });
  }
}
