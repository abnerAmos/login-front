import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.baseUrl + "/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("token", value.token);
        sessionStorage.setItem("refreshToken", value.refreshToken);
      })
    )
  }

  register(username: string, email: string, password: string) {
    return this.httpClient.post(this.baseUrl + "/register", { username, email, password })
  }
}
