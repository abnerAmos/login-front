import { ComponentRef, Injectable, Injector } from '@angular/core';
import { ToastComponent } from '../../components/toast/toast.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay, private injector: Injector) { }

  showToast(type: 'success' | 'error', message: string, duration: number = 5000): void {
    // Se já houver um toast aberto, fecha-o antes de criar um novo.
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }

    // Configuração do overlay (posição no canto superior direito)
    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      positionStrategy: this.overlay.position()
        .global()
        .top('16px')
        .right('16px'),
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    // Cria o overlay
    this.overlayRef = this.overlay.create(overlayConfig);

    // Cria um portal para o ToastComponent
    const toastPortal = new ComponentPortal(ToastComponent);
    const componentRef: ComponentRef<ToastComponent> = this.overlayRef.attach(toastPortal);

    // Injeta os dados no componente
    componentRef.instance.message = message;
    componentRef.instance.type = type;
    componentRef.instance.duration = duration;

    // Sobrescreve a função close para fechar o overlay e destruir o componente
    const originalClose = componentRef.instance.close.bind(componentRef.instance);
    componentRef.instance.close = () => {
      originalClose();
      this.overlayRef?.dispose();
      this.overlayRef = null;
    };
  }
}
