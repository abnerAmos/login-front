import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

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

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
