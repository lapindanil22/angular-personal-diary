import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({ providedIn: 'root' })
export class AuthService {

  userLoggedIn: boolean;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {
    this.userLoggedIn = false;

    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
        sessionStorage.setItem('user_uid', user.uid);
      } else {
        this.userLoggedIn = false;
      }
    })
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('loginUser: success')
        // this.router.navigate(['/diary']);
      })
    .catch(error => {
      console.log('Auth service: login error');
      console.log('Error code ', error.code);
      console.log('Error ', error);
      // if (error.code)
      //   return { isValid: false, message: error.message };
    })
  }
}
