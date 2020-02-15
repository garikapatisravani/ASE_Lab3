import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { User } from '../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  verifyPwd: boolean = false;
  userObj: User;
  storageService: AuthenticationServiceService;
  constructor(private router: Router,private authenticationService: AuthenticationServiceService) {
    this.verifyPwd = false;
    this.userObj = new User();
    this.userObj.id = "";
    this.userObj.pwd = "";
    this.storageService = authenticationService;

  }

  ngOnInit() {

  }
  validate() {
    this.verifyPwd = this.storageService.verifyPassword(this.userObj);
    if (this.verifyPwd) {
      this.router.navigate(['/nutrition']);
    } else {
      alert('Authentication failed!');
    }
  }
}
