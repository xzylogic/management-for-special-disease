import { Component, OnInit } from '@angular/core';

import { FlowerGradeService } from '../_service/flower-grade.service';
import { FlowerGradeFormService } from '../_service/flower-grade-form.service';

@Component({
  selector: 'app-flower-grade-edit',
  templateUrl: './flower-grade-edit.component.html'
})
export class FlowerGradeEditComponent implements OnInit {

  constructor(
    private flowerGradeService: FlowerGradeService,
    private flowerGradeFormService: FlowerGradeFormService
  ) {
  }

  ngOnInit() {
    // this.setGradeForm();
  }

// 提交保存信息
  getValue(data) {

  }
}
