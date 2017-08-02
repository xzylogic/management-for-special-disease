import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ContainerConfig, FormDropdown, FormText, FormRadio, HintDialog } from '../../../libs';

import { HealthNewsService } from '../_service/health-news.service';
import { HealthNews } from '../_entity/health-news.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-health-news-edit',
  templateUrl: './health-news-edit.component.html'
})
export class HealthNewsEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['healthNews', 'data']) healthNews: Observable<HealthNews>;
  errMsg = '';
  form: any;
  config: any;
  id: any;

  constructor(
    private healthNewsService: HealthNewsService,
    private dialog: MdDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.healthNews.subscribe(data => {
      if (data.id > 0) {
        this.id = data.id;
        this.containerConfig = this.healthNewsService.healthNewsEditConfig(false);
      } else {
        this.containerConfig = this.healthNewsService.healthNewsEditConfig(true);
      }
      this.cdr.detectChanges();
      // if (data.id === 0 && data.typeList) {
      //   this.containerConfig = this.healthNewsService.healthNewsEditConfig(true);
      //   // this.form = this.healthNewsFormService.setForm(data.typeList);
      // } else if (data.typeList) {
      //   this.id = data.id;
      //   this.containerConfig = this.healthNewsService.healthNewsEditConfig(false);
      //   // this.form = this.healthNewsFormService.setForm(data.typeList, data);
      // } else {
      //   this.router.navigate(['/health-news']);
      // }
    });
  }

  createForm(data?) {
    this.form = this.fb.group({
      articleTypeId: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      content: new FormControl(''),
      type: new FormControl('', Validators.required),
      link: new FormControl(''),
      richText: new FormControl(''),
      author: new FormControl(''),
      ranking: new FormControl(''),
      online: new FormControl(''),
      adminId: new FormControl('')
    });
    this.config = {
      articleTypeId: new FormDropdown({
        label: '所属大类',
        key: 'recordExaminationTypeId',
        options: list,
        value: data && data.recordExaminationTypeId || ''
      }),
      imageUrl: new FormText({
        type: 'text',
        label: '项目名称',
        key: 'name',
        value: data && data.name || ''
      }),
      title: new FormText({
        type: 'text',
        label: '别名',
        key: 'alias',
        value: data && data.alias || ''
      }),
      type: new FormRadio({
        label: '类型',
        key: 'type',
        options: [],
        value: data && (data.type == 0 ? data.type : data.type || '')
      }),
      max: new FormText({
        type: 'text',
        label: '上限值',
        key: 'max',
        value: data && (data.max == 0 ? data.max : data.max || '')
      }),
      min: new FormText({
        type: 'text',
        label: '下限值',
        key: 'min',
        value: data && (data.max == 0 ? data.max : data.max || '')
      }),
      reference: new FormText({
        type: 'text',
        label: '参考值',
        key: 'reference',
        value: data && (data.reference == 0 ? data.reference : data.reference || '')
      }),
      unit: new FormText({
        type: 'text',
        label: '单位',
        key: 'unit',
        value: data && data.unit || ''
      }),
      chart: new FormRadio({
        label: '图标选项',
        key: 'chart',
        options: [],
        value: data && data.chart
      }),
      maxY: new FormText({
        type: 'text',
        label: '图表纵坐标最大值',
        key: 'maxY',
        value: data && (data.maxY == 0 ? data.maxY : data.maxY || '')
      }),
      minY: new FormText({
        type: 'text',
        label: '图表纵坐标最小值',
        key: 'minY',
        value: data && (data.minY == 0 ? data.minY : data.minY || '')
      }),
      intervalY: new FormText({
        type: 'text',
        label: '纵坐标间隔',
        key: 'intervalY',
        value: data && (data.intervalY == 0 ? data.intervalY : data.intervalY || '')
      }),
      color: new FormText({
        type: 'text',
        label: '图表线条颜色',
        key: 'color',
        value: data && data.color || '#35B2F2'
      }),
    }
  }

  getValues(value) {
    console.log(value);
    if (this.id) {
      this.healthNewsService.healthNewsUpdate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/health-news']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.healthNewsService.healthNewsCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/health-news']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    }
  }
}
