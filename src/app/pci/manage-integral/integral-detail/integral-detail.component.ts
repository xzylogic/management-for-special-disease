import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TableOption } from '../../../libs';
import { HttpService } from '../../../libs/_service';
import { IntegralDetailService } from './_service/integral-detail.service';
import { IntegralDetailTableService } from './_service/integral-detail-table.service';
import { ContainerConfig, FormRadio, DialogOptions, ActionDialog, HintDialog, FormText, FormFile } from '../../../libs';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import { IntegralDetail } from './_entity/integralDetail.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-integral-detail',
  templateUrl: 'integral-detail.component.html'
})
export class IntegralDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  integralDetailUserTable: TableOption;
  integralDetailDoctorTable: TableOption;
  @select(['integralDetail', 'tab']) tab: Observable<number>;
  @select(['integralDetail', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private integralDetailService: IntegralDetailService,
    private integralDetailTableService: IntegralDetailTableService,
    private dialog: MdDialog,
    @Inject('app') private app,
  ) {
    action.dataChange('integralDetail', new IntegralDetail());
  }

  ngOnInit() {
    this.containerConfig = this.integralDetailService.integralDetailConfig();
    this.integralDetailUserTable = new TableOption({
      titles: this.integralDetailTableService.setTitles(),
      ifPage: true
    });
    this.integralDetailDoctorTable = new TableOption({
      titles: this.integralDetailTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
  }

  reset0() {
    this.integralDetailUserTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getIntegralDetailUsers(page[0]);
    });
  }

  reset1() {
    this.integralDetailDoctorTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getIntegralDetailDoctors(page[0]);
    });
  }

  getIntegralDetailUsers(page: number) {
    this.action.pageChange('integralDetail', [page, this.integralDetailDoctorTable.currentPage]);
    this.integralDetailUserTable.reset(page);
    const option: any = {flag: page, type: 0};
    if (this.integralDetailUserTable.queryKey) {
      option.param = this.integralDetailUserTable.queryKey;
    }
    this.integralDetailService.getIntegralDetail(option)
      .subscribe(res => {
        this.integralDetailUserTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.integralDetailUserTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.integralDetailUserTable.totalPage = res.data.totalPages;
          this.integralDetailUserTable.lists = res.data.content;
        } else {
          this.integralDetailUserTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.integralDetailUserTable.loading = false;
        console.log(err);
        this.integralDetailUserTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getIntegralDetailDoctors(page: number) {
    this.action.pageChange('integralDetail', [this.integralDetailUserTable.currentPage, page]);
    this.integralDetailDoctorTable.reset(page);
    const option: any = {flag: page, type: 1};
    if (this.integralDetailDoctorTable.queryKey) {
      option.param = this.integralDetailDoctorTable.queryKey;
    }
    this.integralDetailService.getIntegralDetail(option)
      .subscribe(res => {
        this.integralDetailDoctorTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.integralDetailDoctorTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.integralDetailDoctorTable.totalPage = res.data.totalPages;
          this.integralDetailDoctorTable.lists = res.data.content;
        } else {
          this.integralDetailDoctorTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.integralDetailDoctorTable.loading = false;
        console.log(err);
        this.integralDetailDoctorTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  integralManage() {
    this.integralDetailService.getIntegralRule()
      .subscribe(res => {
        if (res.code === 0) {
          this.IntegralRule(res.data);
          console.log(res.data);
        }
      }, err => {
        alert(err);
      })
  }

  IntegralRule(data) {
    const config = new DialogOptions({
      title: `积分规则维护`,
      message: '',
      buttons: [{
        key: 'confirm',
        value: '确定',
        color: 'primary'
      }, {
        key: 'cancel',
        value: '取消',
        color: ''
      }],
      forms: [
        {
          key: 'id',
          label: 'id',
          value: data.id || '',
        }, {
          key: 'rule',
          label: '积分规则说明',
          value: data.rule || ''
        }]
    });
    ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result && result.key === 'confirm') {
        this.toIntegralRule(result.value);
      }
    });
  }

  sendIntegral() {
    const config = new MdDialogConfig();
    const other = this.dialog.open(DialogComponent, config);
    other.afterClosed().subscribe(result => {
      if (result) {
        this.toPresentExp(result);
      }
    });
  }

  toPresentExp(data) {
    this.integralDetailService.PresentExp(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  toIntegralRule(data) {
    this.integralDetailService.integralRuleUpdate(data[0].value, data[1].value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  change(index) {
    this.action.tabChange('integralDetail', index);
  }
}

@Component({
  selector: 'app-integral-detail-edit',
  templateUrl: 'integral-detail-edit.component.html',
  styleUrls: ['integral-detail-edit.component.scss']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  config: any;
  errMsg = '';

  constructor(
    private uploadService: HttpService,
    private fb: FormBuilder,
    private dialog: MdDialog,
    private cdr: ChangeDetectorRef,
    @Inject('app') private app,
    public dialogRef: MdDialogRef<DialogComponent>,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.cdr.detectChanges();
  }

  createForm() {
    this.form = this.fb.group({
      type : new FormControl({value: ''}, Validators.required),
      integral: new FormControl({value: ''}, Validators.required),
      exEcl: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
       type: new FormRadio({
         key: 'type',
         label: '选择APP',
         value: '',
         required: true,
         options: [{
           id: 1,
           name: '患者端'
         }, {
           id: 0,
           name: '医生端'
         }],
       }),
      integral: new FormText({
        key: 'integral',
        label: '赠送数量',
        value: '',
        required: true,
      }),
      exEcl: new FormFile({
        key: 'exEcl',
        label: '上传表格',
        value: '',
        required: true,
        url: ''
      })
    }
  }

  // 上传表格
  uploadChange(files) {
    const myForm = new FormData();
    myForm.append('file', files.target.files[0]);
    this.uploadService.upload(`${this.app.pci.BASE_URL}api/analyticalXlsxBackIds`, myForm)
      .subscribe(res => {
        if (res.code === 0) {
          this.config.exEcl.value = res.data;
          HintDialog('上传表格成功！', this.dialog);
        } else {
          HintDialog(res.msg || '上传表格失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('上传表格失败！', this.dialog);
      });
  }
}
