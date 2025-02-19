import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstInputComponent } from '../../components/first-input/first-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginComponent,
    ReactiveFormsModule,
    FirstInputComponent,
    ToastComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginPage {
  loginForm!: FormGroup;

  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toast.showToast('success', 'Login realizado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: () => this.toast.showToast('danger', 'Erro ao realizar login. Verifique suas credenciais.')
    });
  }

  navigate() {
    this.router.navigate(["/sign-up"])
  }
}
