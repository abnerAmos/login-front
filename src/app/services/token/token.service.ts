import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'token';
  private refreshTokenKey = 'refreshToken';

  saveTokens(token: string, refreshToken: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    sessionStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.refreshTokenKey);
  }

  clearTokens(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.refreshTokenKey);
  }
}
