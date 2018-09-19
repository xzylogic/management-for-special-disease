import {Component, ViewChild} from "@angular/core";
import { DataCollectionService } from '../_service/data-collection.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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
  // exportArr = ['预审','待录入','待审核','审核通过','未处理','审核失败'];

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
    // console.log(this.checked0.checked)
    this.checked6.checked = false;
  }
  getExportFile(){
    let Export = (checked:boolean,status:any) => {
      if(checked){
        this.dataCollectionService.exportFiles(status)
          .subscribe(res => {
            console.log(res)
            const blob = new Blob([res], {type: 'application/vnd.ms-excel'});
            console.log(blob)
            // const fileName = res.headers().filename;
            let fileName = '';
            switch (status) {
              case 0:
                fileName = '待录入' + '.xls';
                break;
              case 1:
                fileName = '待审核' + '.xls';
                break;
              case 2:
                fileName = '未处理' + '.xls';
                break;
              case 3:
                fileName = '审核通过' + '.xls';
                break;
              case 4:
                fileName = '审核失败' + '.xls';
                break;
              case 5:
                fileName = '预审' + '.xls';
                break;
              // case null:
              //   fileName = '病史导出' + '.xlsx';
              //   break;
              default:
                return
            }
            const objectUrl = URL.createObjectURL(blob);
            console.log(objectUrl)
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display:none');
            // a.setAttribute('href', objectUrl);
            a.setAttribute('href', res.data);
            a.setAttribute('download', fileName);
            a.click();
            console.log(a)
            URL.revokeObjectURL(objectUrl);
          })
      }
      return null;
    };
    Export(this.checked0.checked,5);
    Export(this.checked1.checked,0);
    Export(this.checked2.checked,1);
    Export(this.checked3.checked,3);
    Export(this.checked4.checked,2);
    Export(this.checked5.checked,4);
    // Export(this.checked6.checked,null);
  }
}