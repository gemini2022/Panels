import { CommonModule } from '@angular/common';
import { Component, booleanAttribute, effect, input, output } from '@angular/core';

@Component({
  selector: 'draggable-panel-max-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-panel-max-button.component.html',
  styleUrl: './draggable-panel-max-button.component.scss'
})
export class DraggablePanelMaxButtonComponent {
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
    this._icon = this.icon() ? this.icon()! : getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-max-button-icon');
  }



  private setTooltip(): void {
    this._tooltip = this.tooltip() ? this.tooltip()! : getComputedStyle(document.documentElement).getPropertyValue('--draggable-panel-max-button-tooltip');
  }
}