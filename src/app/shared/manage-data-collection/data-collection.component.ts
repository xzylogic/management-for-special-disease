import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { FormDropdown } from '../../libs/dform/_entity/form-dropdown';
import { FormText } from '../../libs/dform/_entity/form-text';
import { EditDialog } from '../../libs/dmodal/dialog-edit.component';
import { HintDialog } from '../../libs/dmodal/dialog.component';
import { DialogEdit } from '../../libs/dmodal/dialog.entity';
import { TableOption } from '../../libs/dtable/dtable.entity';
import { DataCollectionService } from './_service/data-collection.service';
import { DataCollectionTableService } from './_service/data-collection-table.service';
import { ERRMSG } from '../../pci/_store/static';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {MatDialogComponent} from './matDialog/matDialog.component';

export interface DialogData {
  id: any;
}

@Component({
  selector: 'app-data-collection',
  styleUrls: ['./data-collection.component.css'],
  templateUrl: './data-collection.component.html'
})

export class DataCollectionComponent implements OnInit, AfterViewInit {
  containerConfig: ContainerConfig;
  @select(['dataCollection', 'tab']) tab: Observable<number>;
  @select(['dataCollection', 'page']) page: Observable<Array<number>>;
  @select(['dataCollection', 'data']) data: Observable<Object>;
  @ViewChild('tab1') tab1: any;
  @ViewChild('tab2') tab2: any;
  @ViewChild('tab3') tab3: any;
  @ViewChild('tab4') tab4: any;
  @ViewChild('tab5') tab5: any;
  @ViewChild('tab6') tab6: any;

  tab1Scroll: Subject<string> = new Subject<string>();
  tab2Scroll: Subject<string> = new Subject<string>();
  tab3Scroll: Subject<string> = new Subject<string>();
  tab4Scroll: Subject<string> = new Subject<string>();
  tab5Scroll: Subject<string> = new Subject<string>();
  tab6Scroll: Subject<string> = new Subject<string>();

  pretrialTable: TableOption;
  waitingTable: TableOption;
  auditingTable: TableOption;
  auditedTable: TableOption;
  unhandledTable: TableOption;
  defeatedTable: TableOption;
  pages: any;

  id: any;
  // userInfo: any;

  entering: string;
  queryHospitalY: string;
  queryTimeY: string;
  queryHospital: string;
  queryTime: string;
  adoptList = [];
  hospitalList = [];
  MedicalHospitalsList = [];

  queryMedicalHospital: string;

  auth: boolean;

  constructor(
    @Inject('action') private action,
    private route: ActivatedRoute,
    private dataCollectionService: DataCollectionService,
    private dataCollectionTableService: DataCollectionTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.dataCollectionService.dataCollectionConfig();
    this.pretrialTable = new TableOption({
      titles: this.dataCollectionTableService.setPretrialTitles(),
      ifPage: true
    });
    this.waitingTable = new TableOption({
      titles: this.dataCollectionTableService.setWaitingTitles(),
      ifPage: true
    });
    this.auditingTable = new TableOption({
      titles: this.dataCollectionTableService.setAuditingTitles(),
      ifPage: true
    });
    this.auditedTable = new TableOption({
      titles: this.dataCollectionTableService.setAuditedTitles(),
      ifPage: true
    });
    this.unhandledTable = new TableOption({
      titles: this.dataCollectionTableService.setUnhandledTitles(),
      ifPage: true
    });
    this.defeatedTable = new TableOption({
      titles: this.dataCollectionTableService.setDefeatedTitles(),
      ifPage: true
    });
    this.getHospitals();
    this.getMedicalHospitals();
    this.getAuthName();

    this.page.subscribe((page: Array<number>) => {
      this.pages = page;
      this.waitingTable.currentPage = page[0];
      this.auditingTable.currentPage = page[1];
      this.unhandledTable.currentPage = page[2];
      this.auditedTable.currentPage = page[3];
      this.defeatedTable.currentPage = page[4];
      this.pretrialTable.currentPage = page[5];
    });

    this.data.subscribe((data: any) => {
      let datas = data.datas;
      let pages = data.pages;
      if (datas[0] === null) {
        this.reset();
      } else {
        this.pretrialTable.lists = datas[5];
        this.pretrialTable.totalPage = pages[5];
        this.auditingTable.lists = datas[1];
        this.auditingTable.totalPage = pages[1];
        this.waitingTable.lists = datas[0];
        this.waitingTable.totalPage = pages[0];
        this.auditedTable.lists = datas[3];
        this.auditedTable.totalPage = pages[3];
        this.unhandledTable.lists = datas[2];
        this.unhandledTable.totalPage = pages[2];
        this.defeatedTable.lists = datas[4];
        this.defeatedTable.totalPage = pages[4];
      }
    });
  }

  ngAfterViewInit() {
    this.initData();
    let dom1 = this.tab1 && this.tab1.nativeElement || {};
    let dom2 = this.tab2 && this.tab2.nativeElement || {};
    let dom3 = this.tab3 && this.tab3.nativeElement || {};
    let dom4 = this.tab4 && this.tab4.nativeElement || {};
    let dom5 = this.tab5 && this.tab5.nativeElement || {};
    let dom6 = this.tab6 && this.tab6.nativeElement || {};

    this.tab1Scroll.debounceTime(500).distinctUntilChanged().subscribe(scrollTop => {
      this.updateTab(0, scrollTop);
    });
    dom1.onscroll = () => {
      this.tab1Scroll.next(dom1.scrollTop);
    }

    this.tab2Scroll.debounceTime(500).distinctUntilChanged().subscribe(scrollTop => {
      this.updateTab(1, scrollTop);
    });
    dom2.onscroll = () => {
      this.tab2Scroll.next(dom2.scrollTop);
    }

    this.tab3Scroll.debounceTime(500).distinctUntilChanged().subscribe(scrollTop => {
      this.updateTab(2, scrollTop);
    });
    dom3.onscroll = () => {
      this.tab3Scroll.next(dom3.scrollTop);
    }

    this.tab4Scroll.debounceTime(500).distinctUntilChanged().subscribe(scrollTop => {
      this.updateTab(3, scrollTop);
    });
    dom4.onscroll = () => {
      this.tab4Scroll.next(dom4.scrollTop);
    }

    this.tab5Scroll.debounceTime(500).distinctUntilChanged().subscribe(scrollTop => {
      this.updateTab(4, scrollTop);
    });
    dom5.onscroll = () => {
      this.tab5Scroll.next(dom5.scrollTop);
    }

    this.tab6Scroll.debounceTime(500).distinctUntilChanged().subscribe(scrollTop => {
      this.updateTab(5, scrollTop);
    });
    dom6.onscroll = () => {
      this.tab6Scroll.next(dom6.scrollTop);
    }
  }

  initData() {
    let dom1 = this.tab1 && this.tab1.nativeElement || {};
    let dom2 = this.tab2 && this.tab2.nativeElement || {};
    let dom3 = this.tab3 && this.tab3.nativeElement || {};
    let dom4 = this.tab4 && this.tab4.nativeElement || {};
    let dom5 = this.tab5 && this.tab5.nativeElement || {};
    let dom6 = this.tab6 && this.tab6.nativeElement || {};
    dom1.scrollTop = 300;
    this.data.subscribe((data: any) => {
      let datas = data.datas;
      let scrolls = data.scrollTops;
      if (datas[0] !== null) {
        dom1.scrollTop = scrolls[0];
        dom2.scrollTop = scrolls[1];
        dom3.scrollTop = scrolls[2];
        dom4.scrollTop = scrolls[3];
        dom5.scrollTop = scrolls[4];
        dom6.scrollTop = scrolls[5];
      }
    });
  }

  updateTab(index, scrollTop) {
    this.data.subscribe((data: any) => {
      let datas = data.scrollTops;
      datas[index] = scrollTop;
      this.action.dataChange('dataCollection', {...data, ...{scrollTops: datas}});
    });
  }

  reset() {
    this.reset0();
    this.reset1();
    this.reset2();
    this.reset3();
    this.reset4();
    this.reset5();
  }

  reset0() {
    this.queryHospital = '';
    this.queryTime = '';
    this.waitingTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getDataCollections(this.waitingTable, 0, page[0]);
    });
  }

  reset1() {
    this.auditingTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getDataCollections(this.auditingTable, 1, page[1]);
    });
  }

  reset2() {
    this.auditedTable.queryKey = '';
    this.queryMedicalHospital = '';
    this.queryTime = '';
    this.page.subscribe((page: Array<number>) => {
      this.getDataCollections(this.auditedTable, 3, page[3]);
    });
  }

  reset3() {
    this.unhandledTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getDataCollections(this.unhandledTable, 2, page[2]);
    });
  }

  reset4() {
    this.unhandledTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getDataCollections(this.defeatedTable, 4, page[4]);
    });
  }

  reset5() {
    this.queryHospitalY = '';
    this.queryTimeY = '';
    this.pretrialTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getDataCollections(this.pretrialTable, 5, page[5]);
    });
  }

  getDataCollections(list: TableOption, type, page) {
    this.pages[type] = page;
    this.action.pageChange('dataCollection', this.pages);
    list.reset(page);
    this.dataCollectionService.getDataCollections(page, list.size, type, list.queryKey, this.queryHospital, this.queryTime, this.queryMedicalHospital, this.entering)
      .subscribe(
        res => {
          list.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length == 0) {
            list.errorMessage = ERRMSG.nullMsg
          } else if (res.code === 0 && res.data && res.data.content) {
            list.lists = res.data.content;
            list.lists.forEach(obj => {
              this.format(obj);
            });
            this.formatList(list.lists);
            list.totalPage = res.data.totalPages;

            this.data.subscribe((data: any) => {
              let datas = data.datas;
              let pages = data.pages;
              datas[type] = list.lists;
              pages[type] = res.data.totalPages;
              this.action.dataChange(
                'dataCollection',
                {...data, ...{datas: datas, pages: pages}}
              );
            });

          } else {
            list.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          list.loading = false;
          console.log(err);
          list.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getHospitals() {
    this.dataCollectionService.getHospitals()
      .subscribe(res => {
        if (res.code == 0 && res.data) {
          this.hospitalList = res.data;
        }
      })
  }

  getMedicalHospitals() {
    this.dataCollectionService.getMedicalHospitals()
      .subscribe(res => {
        if (res.code == 0 && res.data) {
          this.MedicalHospitalsList = res.data;
        }
      })
  }

  /**
   * 批量导出
   */
  openDialog() {
    const dialogRef = this.dialog.open(MatDialogComponent);

    // 弹框关闭时触发
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Download: ${result}`);
    // });
  }

  /**
   * 判断是否兼职人员录入病史资料
   * @param auth 为 caozuoyuan 代表兼职人员
   */
  getAuthName() {
    const admin = window.sessionStorage.getItem('pci_login_token');
    const name = JSON.parse(admin).name.substring(0, 10);
    if (name == 'caozuoyuan') {
      this.auth = false;
    } else {
      this.auth = true;
    }
  }

  gotoHandle(data) {
    if (data.key === 'dataTypein') {
      this.router.navigate(['/data-collection/edit', data.value.id]);
    }
    if(data.key === 'viewPhoto'){
      const dialogRef = this.dialog.open(MatDialogComponent,{data:{id:this.id = data.value.id}});
    }

    if (data.key === 'editData') {
      this.router.navigate(['/data-collection/edit', data.value.id]);
    }
    if (data.key === 'showData') {
      this.router.navigate(['/data-collection/detail', data.value.id]);
    }
    if (data.key === 'adopt') {
      // auditData(
      //   data.value.id, '您确定审核通过？', 2,
      //   this.dialog, this.dataCollectionService, () => {
      //     // console.log('success');
      //     this.reset();
      //   });

      const config: DialogEdit = new DialogEdit({
        title: '您确定审核通过？',
        button: '提交',
        form: [
          new FormDropdown({
            key: 'idx',
            label: '',
            value: '',
            options: [{
              id: 1,
              name: '检验报告'
            }, {
              id: 2,
              name: '出院小结'
            },{
              id: 3,
              name: '影像资料'
            }, {
              id: 4,
              name: '用药清单'
            },{
              id: 5,
              name: '就诊记录'
            }, {
              id: 6,
              name: '其他'
            }],
            required: true
          })
        ]
      });

      EditDialog(config, this.dialog).afterClosed().subscribe(result => {
        // console.log(result);
        if (result && result.idx) {
          this.passData(data.value.id, result.idx);
          console.log(data.value.id, result.idx);
        }
      });
    }

    if (data.key === 'keepData') {
      auditData(
        data.value.id, '您确定暂不处理该用户资料？', 2,
        this.dialog, this.dataCollectionService, () => {
          // console.log('success');
          this.reset();
        });
    }
    if (data.key === 'tapeOut') {
      auditData(data.value.id, '您确定要将资料提交到审核中？', 1,
        this.dialog, this.dataCollectionService, () => {
          // console.log('success');
          this.reset();
        });
    }
  }

  format(data) {
    if (data.inputList) {
      let inputName = ' ';
      data.inputList.forEach(obj => {
        inputName += ` ${obj.name}`;
      });
      data.inputName = inputName;
    }
    if (data.auditorList) {
      let auditorName = ' ';
      data.auditorList.forEach(obj => {
        auditorName += ` ${obj.name}`;
      });
      data.auditorName = auditorName;
    }
  }

  formatList(list) {
    if (typeof list === 'object') {
      list.forEach(obj => {
        obj.deleted = obj.deleted ? '已删除' : '否';
      });
    }
  }

  change(index) {
    this.action.tabChange('dataCollection', index);
  }

  passData(id, typeId) {
    this.dataCollectionService.getAdopt(id, typeId).subscribe(res => {
      if (res.code == 0) {
        let subscribeDialog = HintDialog('提交成功', this.dialog).afterClosed().subscribe(() => {
          this.reset();
          subscribeDialog.unsubscribe();
        });
      } else {
        HintDialog(res.msg || '提交失败', this.dialog);
      }
    }, err => {
      HintDialog('请求服务器出错', this.dialog);
      throw new Error(err);
    })
  }
}


export function auditData(id, title, status, dialog, service, callback) {
  let form;
  switch (status) {
    case 1 || 3 :
      form = [
        new FormText({
          key: 'auditName',
          label: '提交人姓名',
          value: '',
          required: true
        })
      ];
      break;
    case 2 :
      form = [
        new FormText({
          key: 'auditName',
          label: '提交人姓名',
          value: '',
          required: true
        }),
        new FormText({
          key: 'remark',
          label: '备注',
          value: '',
          required: true
        })
      ];
      break;
    case 3 :
      form = [
        new FormText({
          key: 'auditName',
          label: '提交人姓名',
          value: '',
          required: true
        })
      ];
      break;
    case 4 :
      form = [
        new FormText({
          key: 'auditName',
          label: '提交人姓名',
          value: '',
          required: true
        }),
        new FormText({
          key: 'failedReason',
          label: '拒绝理由',
          value: '',
          required: true
        })
      ]
  }
  const config: DialogEdit = new DialogEdit({
    title: title,
    button: '提交',
    form: form
  });
  EditDialog(config, dialog).afterClosed().subscribe(result => {
    // console.log(result);
    if (result && result.auditName) {
      result.status = status;
      service.statusChanged(id, result)
        .subscribe(res => {
          if (res.code == 0) {
            let subscribeDialog = HintDialog('提交成功', dialog).afterClosed().subscribe(() => {
              callback();
              subscribeDialog.unsubscribe();
            });
          } else {
            HintDialog(res.msg || '提交失败', dialog);
          }
        }, err => {
          HintDialog('请求服务器出错', dialog);
          throw new Error(err);
        })
    }
  });
}
