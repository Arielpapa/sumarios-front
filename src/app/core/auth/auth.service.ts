import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService, AuthenticationService } from 'aam-core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged$: Observable<boolean> = new Subject();

  constructor(
    private apiService: ApiRestService,
    private authService: AuthenticationService,
    private router: Router
  ) { 
    this.logged$ = of((localStorage.getItem("currentUser") ? true : false))
  }
  login(email:string, password:string){
    this.authService.login(email, password)
    .subscribe((res:any)=> {
      console.log(res);
   this.router.navigate(['admin']);
    },(error)=> {
      console.log('error al login');
    })
  }

  logout (){
    this.authService.logout();
    this.router.navigate(['auth/login']);
    // if(localStorage.getItem('user')){
    //   localStorage.clear();
    // }
    // this.logged$=of(false);

  }

}
