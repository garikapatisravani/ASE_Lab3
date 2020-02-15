import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { User } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userObj: User;
  repeatPwd: string;
  formValidated: boolean = false;
  storageService: AuthenticationServiceService;
  registrationResult: boolean = false;
  constructor(private localStorageService: AuthenticationServiceService, private router: Router) {
    this.userObj = new User();
    this.userObj.id = "";
    this.userObj.name = "";
    this.userObj.emailid = "";
    this.userObj.pwd = "";
    this.storageService = localStorageService;
   }

  ngOnInit() {
  }
  register(): void {
    this.validate();
    if (this.formValidated) {
        this.registrationResult = this.storageService.storeOnLocalStorage(this.userObj);
        if (this.registrationResult) {
            alert('Registration successful!');
          this.router.navigate(['/login']);
        } else {
            alert('Registration failed!');
        }
    } else {
        alert('Fill all the details');
    }
}
validate(): void {
  this.formValidated = true;
  if (this.userObj.id == ""||this.userObj.name == ""||this.userObj.emailid == ""||this.userObj.pwd == "") {
      this.formValidated = false;
  };
  if (!(this.userObj.pwd == this.repeatPwd)) {
      this.formValidated = false;
  }
}
}
