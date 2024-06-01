import { PanelBarComponent } from 'panel';
import { CommonModule } from '@angular/common';
import { Component, Renderer2, booleanAttribute, inject, input, output } from '@angular/core';

@Component({
  selector: 'draggable-panel-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-panel-bar.component.html',
  styleUrl: './draggable-panel-bar.component.scss'
})
export class DraggablePanelBarComponent extends PanelBarComponent {
  // Input
  public hoverDisabled = input(false, { transform: booleanAttribute });

  // Output
  public mouseDownedEvent = output<MouseEvent>();

  // Private
  private renderer = inject(Renderer2);
  private removeMouseDownListener!: () => void;


  
  public setMouseDownListener(): void {
    this.removeMouseDownListener = this.renderer.listen(this.bar()?.nativeElement, 'mousedown', ((e: MouseEvent) => this.mouseDownedEvent.emit(e)));
  }



  private ngOnDestroy(): void {
    if (this.removeMouseDownListener) this.removeMouseDownListener();
  }
}