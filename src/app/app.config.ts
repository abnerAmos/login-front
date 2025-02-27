import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/**
 * Configuração global da aplicação Angular.
 * Define os provedores principais usados pelo framework, como roteamento,
 * manipulação de mudanças de zona, cliente HTTP e animações assíncronas.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Ativa otimizações na detecção de mudanças do Angular.
     * - `eventCoalescing: true`: Agrupa eventos assíncronos para reduzir
     *    verificações desnecessárias na detecção de mudanças.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Fornece o serviço de roteamento da aplicação, utilizando as rotas
     * definidas no arquivo `app.routes.ts`.
     */
    provideRouter(routes),

    /**
     * Configura o cliente HTTP da aplicação para realizar requisições HTTP.
     * - `withFetch()`: Habilita o uso da API Fetch nativa para requisições HTTP,
     *    melhorando o desempenho em navegadores modernos.
     */
    provideHttpClient(withFetch()),

    /**
     * Ativa o suporte para animações assíncronas, melhorando o desempenho da aplicação.
     */
    provideAnimationsAsync()
  ]
};
