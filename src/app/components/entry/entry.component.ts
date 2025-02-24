import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

/**
 * Componente reutilizável de entrada para exibição de um título e botões de ação.
 * <p>
 * Este componente permite a exibição de um título e dois botões, sendo um principal e um secundário.
 * Ele emite eventos quando os botões são clicados, permitindo a interação com componentes externos.
 */
@Component({
  selector: 'app-entry-component',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss'
})
export class EntryComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disableBtn: boolean = true;

  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  /** Emite o evento de submissão ao clicar no botão principal. */
  submit() {
    this.onSubmit.emit();
  }

  /** Emite o evento de navegação ao clicar no botão secundário. */
  navigate() {
    this.onNavigate.emit();
  }
}
