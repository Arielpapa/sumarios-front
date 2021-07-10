import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'aam-core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading:boolean=false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: AuthenticationService, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['admin']);  
  }

  }

  login(){
    this.loading = true;
    
    this.auth.login(this.email, this.password).subscribe(
      (res: any) => {
        
        this.router.navigate(['admin']);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error('Email o contraseña incorrectos', 'Error!');
      }
    );
  }

 
}