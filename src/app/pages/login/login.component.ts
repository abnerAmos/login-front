import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstInputComponent } from '../../components/first-input/first-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    LoginComponent,
    ReactiveFormsModule,
    FirstInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginPage {
  loginForm!: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    console.log(this.loginForm.value)
  }

  navigate() {
    this.router.navigate(["/signup"])
  }
}
