import { Component } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  
  selectedFiles:any
  percentage=0
  visible=false


  constructor(private base:BaseService){
  }

  fileSelect(event:any){
    this.selectedFiles=event.target.files[0]
    console.log(this.selectedFiles)
  }
  uploadFile(){
    if (this.selectedFiles!=undefined) {
      
      this.base.uploadFile(this.selectedFiles).subscribe(
        (p)=>{
          this.visible=true
          console.log(p+"%"),
          this.percentage=p?Math.round(p):0
          this.selectedFiles=undefined          
          if (this.percentage==100) {
            setTimeout(()=>{
              console.log("timeOut")
              this.visible=false
              this.percentage=0
            },5000)
          }
      }
      )
    }
  }

  resetFileUpload(){
    console.log("timeOut")
    this.visible=false
    this.percentage=0
    
  }
}
