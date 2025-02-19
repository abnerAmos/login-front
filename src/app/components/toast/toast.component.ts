import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      // Entrada (fade in + deslize para baixo)
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      // Saída (fade out + deslize para cima)
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

  // Função para ser sobrescrita pelo ToastService para fechar o Toast
  close: () => void = () => { };

  ngOnInit(): void {
    // Fecha automaticamente após a duração, se definido
    if (this.duration > 0) {
      this.timerId = setTimeout(() => this.hideToast(), this.duration);
    }
  }

  hideToast(): void {
    this.isVisible = false;
    setTimeout(() => this.close(), 300); // Aguarda a animação antes de remover o componente
  }

  ngOnDestroy(): void {
    // Limpa o timer ao destruir o componente
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}
