import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../types/login-response.type';
import { tap } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => this.tokenService.saveTokens(response.token, response.refreshToken))
    );
  }

  register(username: string, email: string, password: string) {
    return this.httpClient.post(`${this.apiUrl}/register`, { username, email, password })
  }
}
