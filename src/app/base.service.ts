import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private refFilesData:AngularFireList<any>
  private kepUrl= new Subject()

  
  constructor(private storage:AngularFireStorage, private db:AngularFireDatabase) {
    this.refFilesData=this.db.list("/kepek/")
   }

   getFilesData(){
    return this.refFilesData
   }


  uploadFile(file:any){
    const time =Date.now();
    const updateTask=this.storage.upload("kepek/"+file.name, file)
      updateTask.snapshotChanges().subscribe({
      next:(res)=>{
        console.log("feltoltes ",res)
      },
      error:(e)=>{
        console.log("hiba a file feltöltésekor")
      },
      complete:()=>{
        console.log("done"),
        this.storage.ref("/kepek/"+file.name).getDownloadURL().subscribe(
          (url)=>{
            this.db.list("/kepek/").push({name:file.name, time:time, url:url})
            console.log(url),
            this.kepUrl.next(url)
          }
        )
      }
    })
    return updateTask.percentageChanges()
  }

  getKepUrl(){
    return this.kepUrl
  }
  deleteImage(file:any){
    
    this.storage.ref("/kepek/"+file.name).delete().subscribe(
      (c)=>{
        console.log(c)
        this.refFilesData.remove(file.key).then(
          (a)=>console.log(a, " sikeres Törlés")
        )
      }
    )
  }
}
