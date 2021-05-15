import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  constructor(private afs:AngularFireStorage) { }
  path:String="";

  ngOnInit(): void {
  }

  upload(event:any){
    this.path=event.target.files[0]
  }


  title = "cloudsSorage";
  selectedFile: File|null = null;
  downloadURL!: Observable<string>;
  fb!:string;
  onFileSelected() {

    var n = Date.now();

    const filePath = `RoomsImages/${n}`;
    const fileRef = this.afs.ref(filePath);
    const task = this.afs.upload(`RoomsImages/${n}`, this.path);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log("lien");
            console.log(this.fb);  //le lien
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}
