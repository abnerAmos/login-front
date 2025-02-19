import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>("/auth/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("token", value.token);
        sessionStorage.setItem("refreshToken", value.refreshToken);
      })
    )
  }
}
