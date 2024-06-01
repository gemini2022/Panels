import { PanelComponent } from 'panel';
import { CommonModule } from '@angular/common';
import { DraggablePanelBarComponent } from '../draggable-panel-bar/draggable-panel-bar.component';
import { DraggablePanelBodyComponent } from '../draggable-panel-body/draggable-panel-body.component';
import { Component, input, booleanAttribute, output, inject, contentChild, ElementRef } from '@angular/core';
import { DraggablePanelXButtonComponent } from '../draggable-panel-x-button/draggable-panel-x-button.component';
import { DraggablePanelMaxButtonComponent } from '../draggable-panel-max-button/draggable-panel-max-button.component';
import { DraggablePanelMinButtonComponent } from '../draggable-panel-min-button/draggable-panel-min-button.component';

@Component({
  selector: 'draggable-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-panel.component.html',
  styleUrl: './draggable-panel.component.scss'
})
export class DraggablePanelComponent extends PanelComponent {
  // Inputs
  public dragDisabled = input(false, { transform: booleanAttribute });
  

  // Private
  private isDragging = false;
  private host = inject(ElementRef);
  private dragOffset = { x: 0, y: 0 };
  private stopMouseDownPropagation!: boolean;
  private removeWindowMouseUpListener!: () => void;
  private removeWindowMouseMoveListener!: () => void;
  protected override _panelType: string = 'draggable-panel';
  private xButton = contentChild(DraggablePanelXButtonComponent);
  protected override bar = contentChild(DraggablePanelBarComponent);
  private maxButton = contentChild(DraggablePanelMaxButtonComponent);
  private minButton = contentChild(DraggablePanelMinButtonComponent);
  protected override body = contentChild(DraggablePanelBodyComponent);


  
  protected override ngOnInit(): void {
    super.ngOnInit();
    this.setPanelDrag();
  }



  protected override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.renderer.setStyle(this.host.nativeElement, 'width', this.panel()?.nativeElement.offsetWidth + 'px');
    this.renderer.setStyle(this.host.nativeElement, 'height', this.panel()?.nativeElement.offsetHeight + 'px');
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