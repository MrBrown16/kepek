import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {

  images:any=[]
  filesData:any
  constructor(private base:BaseService){
    base.getFilesData().snapshotChanges().pipe(
      map(
        (changes:any)=>changes.map((c:any)=>({key:c.payload.key, ...c.payload.val()}))
      )
    ).subscribe(
      (data)=> {
        this.filesData=data
        this.images=[]
        this.filesData.forEach((e:any) => {
          this.images.push(e.url)
        });
      })
  }

  deleteImg(f:any){
    this.base.deleteImage(f)
  }

}
