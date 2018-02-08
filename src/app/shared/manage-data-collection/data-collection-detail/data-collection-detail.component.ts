import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { DataCollectionDetailService } from '../_service/data-collection-detail.service';
import { DataCollectionService } from '../_service/data-collection.service';

@Component({
  selector: 'app-data-collection-detail',
  templateUrl: './data-collection-detail.component.html',
  styleUrls: ['../data-collection.component.css']
})
export class DataCollectionDetailComponent implements OnInit {
  containerConfig: ContainerConfig;

  title = '病史资料录入';
  subTitle = '患者信息详情';

  userInfo: any;
  errorMessage: string;

  commonList: any;

  auditingEnable = false;
  passEnable = false;
  unpassEnable = false;

  enableShow = false;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataCollectionService: DataCollectionService,
    private dataCollectionDetailService: DataCollectionDetailService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.dataCollectionService.dataCollectionDetailConfig();
    this.getTitle();
    this.getDataCollection();
  }

  resetData() {
    this.userInfo = null;
    this.errorMessage = '';
  }

  getTitle() {
    this.commonList = this.dataCollectionDetailService.setCommonList();
  }

  getDataCollection() {
    this.resetData();
    this.route.params.subscribe(params => {
      this.dataCollectionService.getDataCollection(+params['id'])
        .subscribe(res => {
          // console.log(res);
          if (res.code === 0 && res.data) {
            this.userInfo = res.data;
            if (this.userInfo.status != 1 && this.userInfo.status != 3) {
              this.errorMessage = '该用户还未录入资料哦！';
            }
          } else {
            if (res.msg) {
              this.errorMessage = res.msg;
            } else {
              this.errorMessage = '访问数据出错啦～';
            }
          }
        }, err => {
          this.errorMessage = '啊哦～访问接口出错啦～';
        })
    })
  }

  toAudit() {
    this.auditingEnable = true;
  }

  toPass() {
    this.passEnable = true;
  }

  toUnpass() {
    this.unpassEnable = true;
  }

  done(res) {
    this.auditingEnable = false;
    this.passEnable = false;
    this.unpassEnable = false;
    if (res.code == -1) {
      this.message = res.msg;
      this.enableShow = true;
    } else {
      this.router.navigate(['/data-collection']);
    }
  }
}
