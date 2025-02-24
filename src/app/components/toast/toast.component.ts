import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Componente de Toast (Notificação) reutilizável com animações.
 *
 * Este componente exibe notificações temporárias para alertar o usuário sobre eventos
 * como sucesso ou erro. Ele suporta animações, personalização do tempo de exibição e
 * um botão de fechamento.
 *
 * @selector `app-toast`
 * @input `message` (string) - Mensagem exibida na notificação.
 * @input `type` ('success' | 'error') - Tipo da notificação (define a aparência).
 * @input `duration` (number) - Tempo em milissegundos antes de ocultar automaticamente.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      // Animação de entrada (fade in + deslize para baixo)
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      // Animação de saída (fade out + deslize para cima)
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})

export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'error';
  @Input() duration: number = 3000; // duração em milissegundos

  isVisible = true;
  timerId: any;

  /**
   * Função que pode ser sobrescrita pelo ToastService para remover o componente.
   */
  close: () => void = () => { };

  /**
   * Inicializa o timer para esconder o Toast automaticamente após o tempo definido.
   */
  ngOnInit(): void {
    if (this.duration > 0) {
      this.timerId = setTimeout(() => this.hideToast(), this.duration);
    }
  }

  /**
   * Oculta o Toast, aguardando a finalização da animação antes de removê-lo.
   */
  hideToast(): void {
    this.isVisible = false;
    setTimeout(() => this.close(), 300);
  }

  /**
   * Remove o timer ao destruir o componente para evitar execução desnecessária.
   */
  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}
