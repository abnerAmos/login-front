import { Injectable } from '@angular/core';
import { TokenData } from '../../types/token.type';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'token';
  private refreshTokenKey = 'refreshToken';

  saveTokens(token: TokenData): void {
    sessionStorage.setItem(this.tokenKey, token.accessToken);
    sessionStorage.setItem(this.refreshTokenKey, token.refreshToken);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null
      && this.getRefreshToken !== null;
  }

  clearTokens(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.refreshTokenKey);
  }
}
