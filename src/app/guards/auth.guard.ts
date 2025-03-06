import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isAuthenticated()) {
    return true; // Permite o acesso à rota
  } else {
    router.navigate(['/login']); // Redireciona para a página de login
    return false; // Bloqueia a navegação
  }
};
