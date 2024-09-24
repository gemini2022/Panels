import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, inject, TemplateRef, viewChild, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComponentComponent } from './my-component/my-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MyComponentComponent,

    // For global position (Directive)
    PortalModule,

    // For connected position (Directive)
    OverlayModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {



  // // --------------------------------------------------------------GLOBAL POSITION (Directive)------------------------------------------------------------------------

  private overlay = inject(Overlay);
  @ViewChild(CdkPortal) portal!: CdkPortal;

  protected openMyComponent(): void {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.portal);
  }

  


  // // --------------------------------------------------------------GLOBAL POSITION (Template Portal)------------------------------------------------------------------------

  // private overlay = inject(Overlay);
  // private viewContainerRef = inject(ViewContainerRef);
  // private myTemplate = viewChild<TemplateRef<any>>('myTemplate');


  // protected openMyComponent(): void {
  //   const config = new OverlayConfig({
  //     positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
  //   })
  //   const overlayRef = this.overlay.create(config);
  //   const templatePortal = new TemplatePortal(this.myTemplate()!, this.viewContainerRef)
  //   overlayRef.attach(templatePortal);
  // }



  // --------------------------------------------------------------GLOBAL POSITION (Component Portal)------------------------------------------------------------------------

  // private overlay = inject(Overlay);

  // protected openMyComponent(): void {
  //   const config = new OverlayConfig({
  //     positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
  //   })
  //   const overlayRef = this.overlay.create(config);
  //   const templatePortal = new ComponentPortal(MyComponentComponent)
  //   overlayRef.attach(templatePortal);
  // }



  // // --------------------------------------------------------------CONNECTED POSITION (Directive)------------------------------------------------------------------------

  protected myComponentOpen!: boolean;



  // // --------------------------------------------------------------CONNECTED POSITION (Template Portal)------------------------------------------------------------------------

  // private overlay = inject(Overlay);
  // private viewContainerRef = inject(ViewContainerRef);
  // private myTemplate = viewChild<TemplateRef<any>>('myTemplate');
  // private myButton = viewChild<ElementRef<HTMLButtonElement>>('myButton');

  // protected openMyComponent(): void {
  //   const config = new OverlayConfig({
  //     positionStrategy: this.overlay.position().flexibleConnectedTo(this.myButton()?.nativeElement!).withPositions([
  //       {
  //         originX: 'start',
  //         originY: 'bottom',
  //         overlayX: 'start',
  //         overlayY: 'top'
  //       }
  //     ])
  //   })
  //   const overlayRef = this.overlay.create(config);
  //   const templatePortal = new TemplatePortal(this.myTemplate()!, this.viewContainerRef)
  //   overlayRef.attach(templatePortal);
  // }



  // // --------------------------------------------------------------CONNECTED POSITION (Component Portal)------------------------------------------------------------------------

  // private overlay = inject(Overlay);
  // private myButton = viewChild<ElementRef<HTMLButtonElement>>('myButton');


  // protected openMyComponent(): void {
  //   const config = new OverlayConfig({
  //     positionStrategy: this.overlay.position().flexibleConnectedTo(this.myButton()?.nativeElement!).withPositions([
  //       {
  //         originX: 'start',
  //         originY: 'bottom',
  //         overlayX: 'start',
  //         overlayY: 'top'
  //       }
  //     ])
  //   })

  //   const overlayref = this.overlay.create(config);
  //   const componentPortal = new ComponentPortal(MyComponentComponent);
  //   overlayref.attach(componentPortal);
  // }
}