import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  register(username: string, email: string, password: string) {
    return this.httpClient.post("/register", { username, email, password })
  }
}
