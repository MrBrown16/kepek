import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-images-view',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.css']
})
export class ImagesViewComponent {
  actInd:any
  kezdInd:any
  viewImages=[]

  @Input() images:any;

  constructor(){
    this.actInd=0
    this.kezdInd=0
  }

  ngOnChanges(changes:SimpleChanges):void{
    if (changes['images'].currentValue!=changes['images'].previousValue) {
      this.viewImages=this.images.slice(0,3)
    }
  }

  selectImage(index:any){
    this.actInd=this.kezdInd+index
  } 

  moveIndex(elore:boolean){

    if (!elore) {
      this.kezdInd++
    }else{
      this.kezdInd--
    }
    this.viewImages=this.images.slice(this.kezdInd, this.kezdInd+3)


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
