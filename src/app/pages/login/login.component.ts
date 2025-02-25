import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstInputComponent } from '../../components/first-input/first-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/api/login.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from '../../services/toast/toast.service';
import { EntryComponent } from '../../components/entry/entry.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    EntryComponent,
    ReactiveFormsModule,
    FirstInputComponent,
    MatSnackBarModule
  ],
  providers: [
    LoginService,
    ToastService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginPage {
  loginForm!: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private toast: ToastService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toast.showToast('success', 'Login realizado com sucesso!')
        this.router.navigate(['/dashboard']);
      },
      error: () => this.toast.showToast('error', 'Erro ao realizar login. Verifique suas credenciais.')
    });
  }

  navigate() {
    this.router.navigate(["/register"])
  }
}
