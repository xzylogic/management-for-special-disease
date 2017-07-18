import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ContainerConfig, HintDialog } from '../../../libs';
import { HealthNewsService } from '../_service/health-news.service';
import { HealthNewsFormService } from '../_service/health-news-form.service';
import { HealthNews } from '../_entity/health-news.entity';
import { ERRMSG } from 'app/pci/_store/static';

@Component({
  selector: 'app-health-news-edit',
  templateUrl: './health-news-edit.component.html'
})
export class HealthNewsEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['healthNews', 'data']) healthNews: Observable<HealthNews>;
  errMsg = '';
  form: any;
  state: boolean;

  constructor(
    private healthNewsService: HealthNewsService,
    private healthNewsFormService: HealthNewsFormService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.healthNews.subscribe(data => {
      if (data.id === 0 && data.typeList) {
        this.state = false;
        this.containerConfig = this.healthNewsService.healthNewsEditConfig(true);
        this.form = this.healthNewsFormService.setForm(data.typeList);
      } else if (data.typeList) {
        this.state = true;
        this.containerConfig = this.healthNewsService.healthNewsEditConfig(false);
        this.form = this.healthNewsFormService.setForm(data.typeList, data);
      } else {
        this.router.navigate(['/health-news']);
      }
    });
  }

  getValues(value) {
    console.log(value);
    if (this.state) {
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
