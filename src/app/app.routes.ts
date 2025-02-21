import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.component';
import { RegisterPage } from './pages/register/register.component';

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
    component: RegisterPage
  },
];
