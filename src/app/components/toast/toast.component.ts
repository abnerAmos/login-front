import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})

export class ToastComponent {
  messages: { type: string; text: string }[] = [];

  showToast(type: 'success' | 'danger', text: string) {
    this.messages.push({ type, text });

    // Remove o toast após 5 segundos
    setTimeout(() => {
      this.messages.shift();
    }, 5000);
  }
}
