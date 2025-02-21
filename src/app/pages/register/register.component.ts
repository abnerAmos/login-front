import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstInputComponent } from '../../components/first-input/first-input.component';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from '../../services/toast/toast.service';
import { RegisterService } from '../../services/register/register.service';
import { EntryComponent } from '../../components/entry/entry.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    EntryComponent,
    ReactiveFormsModule,
    FirstInputComponent,
    MatSnackBarModule
  ],
  providers: [
    RegisterService,
    ToastService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterPage {
  registerForm!: FormGroup;

  constructor(private router: Router, private registerService: RegisterService, private toast: ToastService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  submit() {
    this.registerService.register(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password
    ).subscribe({
      next: () => {
        this.toast.showToast('success', 'Cadastro realizado com sucesso!')
        this.router.navigate(['/auth/login']);
      },
      error: () => this.toast.showToast('error', 'Erro ao realizar cadastro. Entre em contato com o suporte.')
    });
  }

  navigate() {
    this.router.navigate(["/login"])
  }
}
