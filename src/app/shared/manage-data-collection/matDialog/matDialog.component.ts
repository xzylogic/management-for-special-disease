import {Component, Input, ViewChild} from "@angular/core";

@Component({
  selector: 'matDialog',
  styleUrls: ['./matDialog.component.css'],
  templateUrl: './matDialog.component.html',
})
export class MatDialogComponent {
  // @Input() checked: boolean;
  @ViewChild('all') all: any;
  @ViewChild('check') check: any;
  @ViewChild('allChecked') allCheck: any;
  // @ViewChild('checked0') checked0: any;
  // @ViewChild('checked1') checked1: any;
  // @ViewChild('checked2') checked2: any;
  // @ViewChild('checked3') checked3: any;
  // @ViewChild('checked4') checked4: any;
  // @ViewChild('checked5') checked5: any;
  // @ViewChild('checked6') checked6: any;
  exportArr = ['预审','待录入','待审核','审核通过','未处理','审核失败'];
  checked = false;
  allChecked = false;

  _allCheck(){
    console.log(this.allCheck)
    if(this.allChecked){
      this.checked = true;
    }else{
      this.checked = false;
    }
  }

  _Check(){
    console.log(this.check)
    this.allChecked = false;

  }
  getExportFile(){
    console.log(this.all.nativeElement.children)
    console.log(this.all.nativeElement)
    // console.log(this.all.nativeElement.children[0])

    // console.log(this.checked0)
    // console.log(this.checked0.checked)
    // console.log(this.all.nativeElement.children[0].innerText)
    // console.log(this.all.nativeElement.children[0].textContent)
    // console.log(this.all.nativeElement.children.length)
    const len = this.all.nativeElement.children.length;
    let arr = this.all.nativeElement.children;

    // let _checkbox = document.getElementsByClassName("_checkbox");
    // for(let i in arr){
    //
    // }
  }
  getAllExportFile(){

  }
}