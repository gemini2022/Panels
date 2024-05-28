import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, booleanAttribute, contentChild, effect, inject, input, output, viewChild } from '@angular/core';
import { PanelBaseComponent } from '../panel-base/panel-base.component';
import { PanelBarComponent } from '../panel-bar/panel-bar.component';
import { PanelXButtonComponent } from '../panel-x-button/panel-x-button.component';
import { PanelMaxButtonComponent } from '../panel-max-button/panel-max-button.component';
import { PanelMinButtonComponent } from '../panel-min-button/panel-min-button.component';

@Component({
  selector: 'panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  // Inputs
  public width = input<string>();
  public height = input<string>();
  public barHeight = input<string>();
  public allowDrag = input(false, { transform: booleanAttribute });
  public barHoverDisabled = input(false, { transform: booleanAttribute });

  // Outputs
  public xButtonClickedEvent = output();
  public maxButtonClickedEvent = output();
  public minButtonClickedEvent = output();

  // Private
  private isDragging = false;
  private offset = { x: 0, y: 0 };
  private renderer = inject(Renderer2);
  private stopMouseDownPropagation!: boolean;
  private bar = contentChild(PanelBarComponent);
  private base = contentChild(PanelBaseComponent);
  private removeWindowMouseUpListener!: () => void;
  private removeWindowMouseMoveListener!: () => void;
  private xButton = contentChild(PanelXButtonComponent);
  private maxButton = contentChild(PanelMaxButtonComponent);
  private minButton = contentChild(PanelMinButtonComponent);
  private panel = viewChild<ElementRef<HTMLElement>>('panel');


  constructor() {
    effect(() => {
      this.setBaseHeight();
      this.setBarHoverable();
    }, { allowSignalWrites: true })
  }



  private ngOnInit(): void {
    this.setBarHeight();
    this.setPanelDrag();
    this.setXButtonClickSubscription();
    this.setMaxButtonClickSubscription();
    this.setMinButtonClickSubscription();
  }



  private setBaseHeight(): void {
    if (getComputedStyle(document.documentElement).getPropertyValue('--panel-height') || this.height()) {
      const panelHeight = this.panel()?.nativeElement.offsetHeight;
      this.base()?.setHeight(panelHeight! - this.bar()?.getHeight()!);
    }
  }



  private setBarHoverable(): void {
    this.bar()?.disableHover(this.barHoverDisabled());
  }



  private setBarHeight(): void {
    if (this.barHeight()) this.bar()?.setHeight(this.barHeight()!);
  }



  private setPanelDrag(): void {
    if (this.allowDrag()) {
      this.bar()?.setMouseDownListener();
      this.renderer.setStyle(this.panel()?.nativeElement, 'position', 'absolute');
      this.bar()?.mouseDownedEvent.subscribe((e: MouseEvent) => this.onBarMouseDown(e));
      this.xButton()?.mouseDownedEvent.subscribe(() => this.stopMouseDownPropagation = true);
      this.maxButton()?.mouseDownedEvent.subscribe(() => this.stopMouseDownPropagation = true);
      this.minButton()?.mouseDownedEvent.subscribe(() => this.stopMouseDownPropagation = true);
    }
  }



  private setXButtonClickSubscription(): void {
    this.xButton()?.clickedEvent.subscribe(() => {
      this.xButtonClickedEvent.emit();
    })
  }



  private setMaxButtonClickSubscription(): void {
    this.maxButton()?.clickedEvent.subscribe(() => {
      this.maxButtonClickedEvent.emit();
    })
  }



  private setMinButtonClickSubscription(): void {
    this.minButton()?.clickedEvent.subscribe(() => {
      this.minButtonClickedEvent.emit();
    })
  }



  private onBarMouseDown(e: MouseEvent) {
    if (!this.stopMouseDownPropagation) {
      this.isDragging = true;
      this.offset.x = e.clientX - this.panel()?.nativeElement.getBoundingClientRect().left!,
        this.offset.y = e.clientY - this.panel()?.nativeElement.getBoundingClientRect().top!
      this.removeWindowMouseUpListener = this.renderer.listen('window', 'mouseup', () => this.onWindowMouseUp());
      this.removeWindowMouseMoveListener = this.renderer.listen('window', 'mousemove', (e: MouseEvent) => this.onWindowMouseMove(e));

    } else {
      this.stopMouseDownPropagation = false;
    }
  }



  private onWindowMouseMove(e: MouseEvent): void {
    if (this.isDragging) {
      this.renderer.setStyle(this.panel()?.nativeElement, 'left', (e.clientX - this.offset.x) + 'px');
      this.renderer.setStyle(this.panel()?.nativeElement, 'top', (e.clientY - this.offset.y) + 'px');
    }
  }



  private onWindowMouseUp(): void {
    this.isDragging = false
    this.removeWindowMouseUpListener();
    this.removeWindowMouseMoveListener();
  }
}