import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstInputComponent } from '../../components/login-input/login-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../api/login/login.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from '../../services/toast/toast.service';
import { EntryComponent } from '../../components/login-entry/login-entry.component';

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

  // Inicializa o formulário de login com os campos e suas respectivas validações
  constructor(private router: Router, private loginService: LoginService, private toast: ToastService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  /**
   * Submete os dados do formulário para realizar a autenticação do usuário.
   * Caso o login seja bem-sucedido, exibe um toast de sucesso e redireciona para o dashboard.
   * Se houver erro, exibe um toast de erro informando que as credenciais são inválidas.
   */
  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toast.showToast('success', 'Login realizado com sucesso!')
        this.router.navigate(['/dashboard']);
      },
      error: () => this.toast.showToast('error', 'Erro ao realizar login. Verifique suas credenciais.')
    });
  }

  /**
   * Redireciona o usuário para a página de registro.
   */
  navigate() {
    this.router.navigate(["/register"])
  }
}
