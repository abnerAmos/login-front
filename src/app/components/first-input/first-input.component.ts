import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

/**
 * Componente de campo de entrada reutilizável.
 * Implementa a interface ControlValueAccessor para funcionar com formulários reativos.
 */
type InputTypes = "text" | "email" | "password";

@Component({
  selector: 'app-first-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FirstInputComponent),
      multi: true
    }
  ],
  templateUrl: './first-input.component.html',
  styleUrl: './first-input.component.scss'
})
export class FirstInputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text";
  @Input() placeHolder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";

  value: string = '';
  onChange: any = () => { }
  onTouched: any = () => { }

  /**
   * Método acionado ao digitar no campo de entrada.
   * Atualiza o valor e aciona a função de mudança.
   * @param event Evento de entrada do usuário.
   */
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  /**
   * Método da interface ControlValueAccessor.
   * Define o valor do input a partir do modelo do formulário.
   * @param value Valor a ser atribuído ao input.
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Método da interface ControlValueAccessor.
   * Registra a função de callback para mudanças no valor.
   * @param fn Função de callback.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Método da interface ControlValueAccessor.
   * Registra a função de callback para quando o campo perde o foco.
   * @param fn Função de callback.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Método opcional da interface ControlValueAccessor.
   * Define o estado de habilitado ou desabilitado do input.
   * @param isDisabled Define se o campo deve estar desabilitado.
   */
  setDisabledState?(isDisabled: boolean): void { }
}
