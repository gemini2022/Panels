import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'panel-max-button',
  standalone: true,
  imports: [],
  templateUrl: './panel-max-button.component.html',
  styleUrl: './panel-max-button.component.scss'
})
export class PanelMaxButtonComponent {
  // Inputs
  public icon = input<string>();
  public tooltip = input<string>();
  public fontSize = input<string>();

  // Output
  public clickedEvent = output();

  // Private
  protected maxIcon!: string;
  protected maxTooltip!: string;


  constructor() {
    effect(() => {
      this.setIcon();
      this.setTooltip();
    })
  }



  private setIcon(): void {
    this.maxIcon = this.icon() ? this.icon()! : getComputedStyle(document.documentElement).getPropertyValue('--panel-max-button-icon');
  }



  private setTooltip(): void {
    this.maxTooltip = this.tooltip() ? this.tooltip()! : getComputedStyle(document.documentElement).getPropertyValue('--panel-max-button-tooltip');
  }
}