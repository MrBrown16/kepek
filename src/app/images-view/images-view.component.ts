import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-images-view',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.css']
})
export class ImagesViewComponent {
  actImg:any
  
  viewImages=[0,1,2]

  @Input() images:any;

  constructor(){
    this.actImg=0
  }


  selectImage(index:any){
    this.actImg=index
  } 

  moveIndex(elore:boolean){
    // this.viewImages.forEach((e) => {
    //   if (elore) {
    //     console.log("elore")
    //     if (e==this.viewImages.length) {
    //       e=0
    //     }else{
    //       e=e+1
    //     }
    //   }else if (!elore) {
    //     console.log("hatra")
    //     if (e==0) {
    //       e=this.viewImages.length-1
    //     }else{
    //       e=e-1
    //     }
    //   }
    // });
  }
}
