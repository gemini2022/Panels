import { CommonModule } from '@angular/common';
import { Component, booleanAttribute, effect, input, output } from '@angular/core';

@Component({
  selector: 'draggable-panel-min-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-panel-min-button.component.html',
  styleUrl: './draggable-panel-min-button.component.scss'
})
export class DraggablePanelMinButtonComponent {
  // Inputs
  public icon = input<string>();
  public tooltip = input<string>();
  public fontSize = input<string>();
  public disabled = input(false, { transform: booleanAttribute });

  // Outputs
  public clickedEvent = output();
  public mouseDownedEvent = output();

  // Private
  protected _icon!: string;
  protected _tooltip!: string;


  constructor() {
    effect(() => {
      this.setIcon();
      this.setTooltip();
    })
  }



  private setIcon(): void {
    this._icon = this.icon() ? this.icon()! : getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-min-button-icon');
  }



  private setTooltip(): void {
    this._tooltip = this.tooltip() ? this.tooltip()! : getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-min-button-tooltip');
  }
}