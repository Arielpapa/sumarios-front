import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authSevice : AuthService,
  ) { }

  ngOnInit(): void {
    this.authSevice.logout();
  }
  

}
