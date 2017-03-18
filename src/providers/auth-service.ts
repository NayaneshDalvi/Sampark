import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
export class User {
  name: string;
  promoterCode: string;
 
  constructor(name: string, promoterCode: string) {
    this.name = name;
    this.promoterCode = promoterCode;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;
 
  public login(credentials) {
  console.log(credentials)
    if (credentials.promoterCode === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "12345" && credentials.promoterCode === "12345");
        this.currentUser = new User('Nayanesh', 'NayaneshDalvi@gmail.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.promoterCode === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}