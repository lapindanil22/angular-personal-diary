import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private angularFireAuth: AngularFireAuth) {
    this.loginForm = new FormGroup<any>({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
    });

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void { }

  loginUser() {
    if (this.loginForm.invalid)
      return;

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        if (result == null) {
          console.log('logging in...');
          this.router.navigate(['/home']);
        }
        else if (result.isInvalid) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
        }
      });
  }
}
