import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenResponse } from '../../types/token.type';
import { tap } from 'rxjs';
import { TokenService } from '../../auth/token/token.service';

/**
 * Serviço responsável por gerenciar autenticação e registro de usuários.
 * Ele se comunica com a API para realizar login e cadastro.
 */
@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação sem necessidade de importação manual.
})
export class LoginService {
  /**
   * URL base da API de autenticação.
   */
  private apiUrl: string = "http://localhost:8080/auth";

  /**
   * Construtor do serviço.
   * @param httpClient Serviço para realizar chamadas HTTP.
   * @param tokenService Serviço para gerenciar tokens de autenticação.
   */
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  /**
   * Realiza o login do usuário.
   * - Envia uma requisição POST para a API com email e senha.
   * - Em caso de sucesso, armazena os tokens de acesso e refresh.
   * 
   * @param email Email do usuário.
   * @param password Senha do usuário.
   * @returns Um Observable contendo a resposta do login.
   */
  login(email: string, password: string) {
    return this.httpClient.post<TokenResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => this.tokenService.saveTokens(response.token, response.refreshToken))
    );
  }

  /**
   * Realiza o cadastro de um novo usuário.
   * - Envia uma requisição POST para a API com os dados do usuário.
   * 
   * @param username Nome do usuário.
   * @param email Email do usuário.
   * @param password Senha do usuário.
   * @returns Um Observable contendo a resposta do cadastro.
   */
  register(username: string, email: string, password: string, isExperimental: boolean) {
    return this.httpClient.post(`${this.apiUrl}/register`, { username, email, password, isExperimental })
  }
}
