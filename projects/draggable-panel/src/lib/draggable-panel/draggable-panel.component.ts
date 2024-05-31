import { CommonModule } from '@angular/common';
import { Component, input, booleanAttribute, output, inject, Renderer2, contentChild, viewChild, ElementRef, effect } from '@angular/core';
import { DraggablePanelBarComponent } from '../draggable-panel-bar/draggable-panel-bar.component';
import { DraggablePanelBodyComponent } from '../draggable-panel-body/draggable-panel-body.component';
import { DraggablePanelMaxButtonComponent } from '../draggable-panel-max-button/draggable-panel-max-button.component';
import { DraggablePanelMinButtonComponent } from '../draggable-panel-min-button/draggable-panel-min-button.component';
import { DraggablePanelXButtonComponent } from '../draggable-panel-x-button/draggable-panel-x-button.component';

@Component({
  selector: 'draggable-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-panel.component.html',
  styleUrl: './draggable-panel.component.scss'
})
export class DraggablePanelComponent {
  // Inputs
  public width = input<string>();
  public height = input<string>();
  public barHeight = input<string>();
  public barPadding = input<string>();
  public bodyPadding = input<string>();
  public borderRadius = input<string>();
  public barBorderWidth = input<string>();
  public bodyBorderWidth = input<string>();
  public dragDisabled = input(false, { transform: booleanAttribute });
  public barHoverDisabled = input(false, { transform: booleanAttribute });

  // Outputs
  public xButtonClickedEvent = output();
  public maxButtonClickedEvent = output();
  public minButtonClickedEvent = output();

  // Private
  private isDragging = false;
  private dragOffset = { x: 0, y: 0 };
  private renderer = inject(Renderer2);
  private stopMouseDownPropagation!: boolean;
  private bar = contentChild(DraggablePanelBarComponent);
  private body = contentChild(DraggablePanelBodyComponent);
  private removeWindowMouseUpListener!: () => void;
  private removeWindowMouseMoveListener!: () => void;
  private xButton = contentChild(DraggablePanelXButtonComponent);
  private maxButton = contentChild(DraggablePanelMaxButtonComponent);
  private minButton = contentChild(DraggablePanelMinButtonComponent);
  private panel = viewChild<ElementRef<HTMLElement>>('panel');



  private ngOnInit(): void {
    this.setBarHeight();
    this.setPanelDrag();
    this.setBodyHeight();
    this.setBarPadding();
    this.setBodyPadding();
    this.setBarHoverable();
    this.setBorderRadius();
    this.setBarBorderWidth();
    this.setBodyBorderWidth();
    this.setXButtonClickSubscription();
    this.setMaxButtonClickSubscription();
    this.setMinButtonClickSubscription();
  }



  private setBodyHeight(): void {
    if (getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-height') || this.height()) {
      const panelHeight = this.panel()?.nativeElement.offsetHeight;

      setTimeout(() => {
        this.body()?.setHeight(panelHeight! - this.bar()?.getHeight()!);
      });
    }
  }



  private setBarHoverable(): void {
    this.bar()?.disableHover(this.barHoverDisabled());
  }



  private setBarHeight(): void {
    if (this.barHeight()) this.bar()?.setHeight(this.barHeight()!);
  }



  private setPanelDrag(): void {
    if (!this.dragDisabled()) {
      this.bar()?.setMouseDownListener();
      this.bar()?.mouseDownedEvent.subscribe((e: MouseEvent) => this.onBarMouseDown(e));
      this.xButton()?.mouseDownedEvent.subscribe(() => this.stopMouseDownPropagation = true);
      this.maxButton()?.mouseDownedEvent.subscribe(() => this.stopMouseDownPropagation = true);
      this.minButton()?.mouseDownedEvent.subscribe(() => this.stopMouseDownPropagation = true);
    }
  }



  private setBarPadding(): void {
    const padding = this.barPadding() ? this.barPadding() : getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-bar-padding');
    this.bar()?.setPadding(padding!);
  }



  private setBodyPadding(): void {
    const padding = this.bodyPadding() ? this.bodyPadding() : getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-body-padding');
    this.body()?.setPadding(padding!);
  }



  private setBorderRadius(): void {
    const borderRadius = this.borderRadius() ? this.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-border-radius');
    this.renderer.setStyle(this.panel()?.nativeElement, 'border-radius', borderRadius);
    this.bar()?.setBorderRadius(this.panel()?.nativeElement.style.borderTopLeftRadius!, this.panel()?.nativeElement.style.borderTopRightRadius!);
    this.body()?.setBorderRadius(this.panel()?.nativeElement.style.borderBottomLeftRadius!, this.panel()?.nativeElement.style.borderBottomRightRadius!);
  }



  private setBarBorderWidth(): void {
    const borderWidth = this.barBorderWidth() ? this.barBorderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-bar-border-width');
    this.bar()?.setBorderWidth(borderWidth!);
  }



  private setBodyBorderWidth(): void {
    const borderWidth = this.bodyBorderWidth() ? this.bodyBorderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-body-border-width');
    this.body()?.setBorderWidth(borderWidth!);
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
      this.dragOffset.x = e.clientX - this.panel()?.nativeElement.getBoundingClientRect().left!;
      this.dragOffset.y = e.clientY - this.panel()?.nativeElement.getBoundingClientRect().top!;
      this.removeWindowMouseUpListener = this.renderer.listen('window', 'mouseup', () => this.onWindowMouseUp());
      this.removeWindowMouseMoveListener = this.renderer.listen('window', 'mousemove', (e: MouseEvent) => this.onWindowMouseMove(e));

    } else {
      this.stopMouseDownPropagation = false;
    }
  }



  private onWindowMouseMove(e: MouseEvent): void {
    if (this.isDragging) {
      this.renderer.setStyle(this.panel()?.nativeElement, 'left', (e.clientX - this.dragOffset.x) + 'px');
      this.renderer.setStyle(this.panel()?.nativeElement, 'top', (e.clientY - this.dragOffset.y) + 'px');
    }
  }



  private onWindowMouseUp(): void {
    this.isDragging = false
    this.removeWindowMouseUpListener();
    this.removeWindowMouseMoveListener();
  }
}