import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstInputComponent } from '../../components/login-input/login-input.component';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from '../../services/toast/toast.service';
import { EntryComponent } from '../../components/login-entry/login-entry.component';
import { LoginService } from '../../api/login/login.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    EntryComponent,
    ReactiveFormsModule, // Módulo para manipulação de formulários reativos
    FirstInputComponent,
    MatCheckboxModule,
    MatSnackBarModule // Módulo para exibir notificações do Angular Material (não está sendo usado diretamente, mas pode ser necessário para o ToastService)
  ],
  providers: [
    LoginService,
    ToastService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterPage {
  registerForm!: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private toast: ToastService) {

    // Inicializa o formulário de registro com os campos e suas validações
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
      isExperimental: new FormControl(false)
    })
  }

  /**
   * Submete os dados do formulário para realizar o cadastro do usuário.
   * Caso o cadastro seja bem-sucedido, exibe um toast de sucesso e redireciona para a página de login.
   * Se houver erro, exibe um toast de erro.
   */
  submit() {
    const { username, email, password, isExperimental } = this.registerForm.value;

    console.log(isExperimental)

    this.loginService.register(username, email, password, isExperimental)
      .subscribe({
        next: () => {
          this.toast.showToast('success', 'Cadastro realizado com sucesso!')
          this.router.navigate(['/auth/login']);
        },
        error: () => this.toast.showToast('error', 'Erro ao realizar cadastro. Entre em contato com o suporte.')
      });
  }

  /**
   * Redireciona o usuário para a página de login.
   */
  navigate() {
    this.router.navigate(["/login"])
  }
}
