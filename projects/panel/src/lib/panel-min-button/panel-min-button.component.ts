import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'panel-min-button',
  standalone: true,
  imports: [],
  templateUrl: './panel-min-button.component.html',
  styleUrl: './panel-min-button.component.scss'
})
export class PanelMinButtonComponent {
  // Inputs
  public icon = input<string>();
  public tooltip = input<string>();
  public fontSize = input<string>();

  // Output
  public clickedEvent = output();

  // Private
  protected minIcon!: string;
  protected minTooltip!: string;


  constructor() {
    effect(() => {
      this.setIcon();
      this.setTooltip();
    })
  }



  private setIcon(): void {
    this.minIcon = this.icon() ? this.icon()! : getComputedStyle(document.documentElement).getPropertyValue('--panel-min-button-icon');
  }



  private setTooltip(): void {
    this.minTooltip = this.tooltip() ? this.tooltip()! : getComputedStyle(document.documentElement).getPropertyValue('--panel-min-button-tooltip');
  }
}