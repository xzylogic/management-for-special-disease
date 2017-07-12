import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { UserIntegralDetailTableService, UserService } from '../_service';

@Component({
  selector: 'integral-detail',
  templateUrl:"./integral-detail.component.html",
})
export class IntegralDetailComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  IntegralDetailTable: TableOption = new TableOption();

  modalTitle: string;

  constructor(
    private _integraldetailTableService: UserIntegralDetailTableService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.getIntegralDetailTable(0);
    this.getIntegralDetailTitles();
  }

  getIntegralDetailTitles() {
    this.modalTitle = this.data.value.name+"积分明细";
    this.IntegralDetailTable.titles = this._integraldetailTableService.setTitles();
  }

  getIntegralDetailTable(page:number){
     this.IntegralDetailTable.errorMessage = '';
     this.IntegralDetailTable.loading = true;
     this.IntegralDetailTable.lists = null;
     this.IntegralDetailTable.currentPage = page;
     this._userService.userIntegralDetail(this.data.value.id,page).subscribe(
        data =>{
          this.IntegralDetailTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.IntegralDetailTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.IntegralDetailTable.totalPage = data.data.totalPages;
            this.IntegralDetailTable.lists = data.data.content;
          } else {
            this.IntegralDetailTable.errorMessage = "空空如也～";
          }
        }, err =>{
          this.IntegralDetailTable.loading = false;
          this.IntegralDetailTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  refresh(){
    this.getIntegralDetailTable(0);
  }
  
  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
