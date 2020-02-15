import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './model';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
const STORAGE_KEY = 'local_users';
const IS_LOGGED_IN_KEY = 'logged_in';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }
 
   public storeOnLocalStorage(user: User): boolean {

    var result: boolean;

    // get array of users from local storage
    var verifyIdRes: boolean = this.verifyId(user);

    if (!(verifyIdRes)) {
      const currentUsers = this.storage.get(STORAGE_KEY) || [];
      // push new user to array

      currentUsers.push({
        title: user.id,
        data: user
      });

      // insert updated array to local storage
      this.storage.set(STORAGE_KEY, currentUsers);
      result = true;
    } else {
      result = false;
    }

    return result;
  }

  public verifyId(user: User): boolean {
    let result: boolean = false;
    // get users from local storage
    const currentUsers = this.storage.get(STORAGE_KEY) || [];

    for (var i = 0; i < currentUsers.length; i++) {
      if (currentUsers[i].title == user.id) {
        result = true;
        break;
      }
    }
    return result;
  }

  public verifyPassword(user: User): boolean {
    var result: boolean = false;
    // get users from local storage
    const currentUsers = this.storage.get(STORAGE_KEY) || [];

    for (var i = 0; i < currentUsers.length; i++) {
      if (currentUsers[i].title == user.id) {
        var enteredPwd: String = user.pwd;
        if (enteredPwd == currentUsers[i].data.pwd) {
          result = true;
          this.storage.set(IS_LOGGED_IN_KEY, true);
        } else {
          result = false;
          this.storage.set(IS_LOGGED_IN_KEY, false);
        }
        break;
      }
    }
    return result;
  }

  public checkedLoggedIn(): boolean {
    // get loggedin user information
    const loggedIn = this.storage.get(IS_LOGGED_IN_KEY) || false;
    return loggedIn;
  }

  public logout(): void {
    this.storage.set(IS_LOGGED_IN_KEY, false);
  }
}
