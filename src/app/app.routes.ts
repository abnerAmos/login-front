import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginPage } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  }
];
