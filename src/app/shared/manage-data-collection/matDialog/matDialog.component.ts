import {Component, ViewChild} from "@angular/core";
import { DataCollectionService } from '../_service/data-collection.service';

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

  constructor(
    private dataCollectionService: DataCollectionService,
  ){

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
    this.checked6.checked = false;
  }
  getExportFile(){
    let Export = (checked:boolean,status:any) => {
      if(checked){
        this.dataCollectionService.exportFiles(status)
          .subscribe(res => {
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display:none');
            a.setAttribute('href', res.data);
            a.click();
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
    }
    Export(this.checked6.checked,null);
  }
}