import {Component, ViewChild, Inject} from "@angular/core";
import { DataCollectionService } from '../_service/data-collection.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../data-collection.component'
import {HintDialog} from "../../../libs/dmodal/dialog.component";

@Component({
  selector: 'matDialog',
  styleUrls: ['./matDialog.component.css'],
  templateUrl: './matDialog.component.html',
})
export class MatDialogComponent {
  @ViewChild('all') all: any;
  @ViewChild('checked0') checked0: any;
  @ViewChild('checked1') checked1: any;
  @ViewChild('checked2') checked2: any;
  @ViewChild('checked3') checked3: any;
  @ViewChild('checked4') checked4: any;
  @ViewChild('checked5') checked5: any;
  @ViewChild('checked6') checked6: any;

  showMat:boolean = true;
  userInfo: any;
  angle = 0;
  // _checked0:boolean = this.checked0.checked;
  // _checked1:boolean = this.checked1.checked;
  // _checked2:boolean = this.checked2.checked;
  // _checked3:boolean = this.checked3.checked;
  // _checked4:boolean = this.checked4.checked;
  // _checked5:boolean = this.checked5.checked;
  // _checked6:boolean = this.checked6.checked;

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dataCollectionService: DataCollectionService,
    private dialog: MatDialog,
  ){

  }

  ngOnInit(){
    if(this.data && this.data.id){
      this.showMat = false;
      this.viewPhotos(this.data.id);
    }
  }

  rotate() {
    this.angle += 90;
  }

  getImageSize() {
    return `rotate(${this.angle}deg)`;
  }

  viewPhotos(id){
    this.dataCollectionService.getDataCollection(id)
      .subscribe(res => {
        this.userInfo = res.data;
      })
  }

  _allCheck(){
    if(this.checked6.checked){
      this.checked0.checked = true;
      this.checked1.checked = true;
      this.checked2.checked = true;
      this.checked3.checked = true;
      this.checked4.checked = true;
      this.checked5.checked = true;
      this.checked6.checked = true;
    }else{
      this.checked0.checked = false;
      this.checked1.checked = false;
      this.checked2.checked = false;
      this.checked3.checked = false;
      this.checked4.checked = false;
      this.checked5.checked = false;
      this.checked6.checked = false;
    }
  }

  _Check(){
    if(this.checked0.checked == true && this.checked1.checked == true && this.checked2.checked == true && this.checked3.checked == true &&
      this.checked4.checked == true && this.checked5.checked == true){
      return this.checked6.checked = true;
    }
    return this.checked6.checked = false;
  }

  getExportFile(){
    let Export = (checked:boolean,status:any) => {
      if(checked){
        this.dataCollectionService.exportFiles(status)
          .subscribe(res => {
            if (res && res.code === 0) {
              const a = document.createElement('a');
              document.body.appendChild(a);
              a.setAttribute('style', 'display:none');
              a.setAttribute('href', res.data);
              a.click();
            } else {
              HintDialog(res.msg || '啊哦～访问接口出错啦～！', this.dialog);
            }
          }, err => {
            HintDialog('啊哦～访问接口出错啦～', this.dialog);
            throw new Error(err);
          })
      }
      return null;
    };
    if(this.checked6.checked === false){
      Export(this.checked0.checked,5);
      Export(this.checked1.checked,0);
      Export(this.checked2.checked,1);
      Export(this.checked3.checked,3);
      Export(this.checked4.checked,2);
      Export(this.checked5.checked,4);
    }else{
      Export(this.checked6.checked,null);
    }
  }

}