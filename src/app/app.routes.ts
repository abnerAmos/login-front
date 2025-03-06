import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.component';
import { RegisterPage } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "register",
    component: RegisterPage,
    // canActivate: [authGuard]
  },
];
