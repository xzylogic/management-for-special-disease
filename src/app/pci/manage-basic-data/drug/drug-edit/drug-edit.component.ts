import { Component, OnInit } from '@angular/core';

import { DrugService } from '../_service/drug.service';
import { DrugFormService } from '../_service/drug-form.service';

@Component({
  selector: 'app-drug-edit',
  templateUrl: './drug-edit.component.html'
})
export class DrugEditComponent implements OnInit {

  constructor(
    private drugService: DrugService,
    private drugFormService: DrugFormService
  ) {
  }

  ngOnInit() {
    // this.setDrugForm();
  }

// 提交保存信息
  getValue(data) {

  }
}
