import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-risk-edit',
  templateUrl: './risk-detail.component.html',
})
export class RiskDetailComponent implements OnInit {
  option: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<RiskDetailComponent>
  ) {
    this.option = this.data
  }

  ngOnInit() {
    let date = new Date(this.data.date);
    this.option.year = date.getFullYear();
  }
}
