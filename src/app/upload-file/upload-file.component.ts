import { Component } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  
  selectedFiles:any
  
  percentages:any
  visible=false
  going:any

  szinek:any
  constructor(private base:BaseService){
  }

  fileSelect(event:any){
    this.selectedFiles=Array.from(event.target.files).filter(
      (e:any)=>{return e.type.includes('image')}
    )
    this.percentages=new Array(this.selectedFiles.length)
    console.log(this.selectedFiles)
  }
  uploadFile(){
    if (this.selectedFiles!=undefined) {
      this.going=this.selectedFiles.length
      this.selectedFiles.forEach((e:any, i:any) => {
        this.percentages[i]=0
        this.base.uploadFile(e).subscribe(
          (p)=>{
            this.visible=true
            console.log(p+"%"),
            this.percentages[i]=p?Math.round(p):0
            this.selectedFiles=undefined          
            if (this.percentages[i]==100) {
              setTimeout(()=>{
                console.log("timeOut")
                console.log("timeOut going: ", this.going)
                if (this.going==0) {
                  this.visible=false
                }else{
                  this.going--
                }
                this.percentages[i]=0
              },5000)
            }
          }
        )
      });
    }
  }


  generateSzinek(num:any){
    this.szinek=new Array(num)
    for(let i=0; i<=num; i++){
      this.szinek.push({r:this.generateColorcomp(), g:this.generateColorcomp(), b: this.generateColorcomp()})
      
    }
    
  }
  generateColorcomp(){
    return Math.floor(Math.random()*255)
  }
}
