import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import {  ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chami } from '../defintions';
import { ChamisService } from '../chamis.service';

@Component({
  selector: 'app-chamis',
  templateUrl: './chamis.component.html',
  styleUrls: ['./chamis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChamisComponent implements OnInit {

  chamis = new BehaviorSubject<Chami[]>( [] );
  // users: User[]=[]; // ça devrait être un observable (BehaviorSubject)

  constructor(private chamiService: ChamisService) { }
  // constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getChamis();
    // console.log(this.users);

    // this.http.get('http://localhost:5000/api/users/').toPromise().then(
    //   data => {
    //     console.log(data);
    //     this.users.next( data as User[] );
    //   }
    // )
  }

  getChamis():void {
    this.chamiService.getChamis().subscribe(
      (response: Chami[]) => {
        this.chamis.next(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  compteExistant=false;
  getChami(id: string):void {
    console.log("calllled");
    this.chamiService.getChami(id).subscribe(
      (response: Chami) => {
        this.compteExistant=true;
        console.log('trouvé');
      },
      (error: HttpErrorResponse) => {
        if(error.status===404){
          this.compteExistant= false;
          console.log('compteInexistant');
        }
      }
    )
  }


}
