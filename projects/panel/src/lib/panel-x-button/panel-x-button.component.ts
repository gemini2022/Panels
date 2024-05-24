import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'panel-x-button',
  standalone: true,
  imports: [],
  templateUrl: './panel-x-button.component.html',
  styleUrl: './panel-x-button.component.scss'
})
export class PanelXButtonComponent {
  // Inputs
  public icon = input<string>();
  public tooltip = input<string>();
  public fontSize = input<string>();

  // Output
  public clickedEvent = output();

  // Private
  protected xIcon!: string;
  protected xTooltip!: string;


  constructor() {
    effect(() => {
      this.setIcon();
      this.setTooltip();
    })
  }



  private setIcon(): void {
    this.xIcon = this.icon() ? this.icon()! : getComputedStyle(document.documentElement).getPropertyValue('--panel-x-button-icon');
  }



  private setTooltip(): void {
    this.xTooltip = this.tooltip() ? this.tooltip()! : getComputedStyle(document.documentElement).getPropertyValue('--panel-x-button-tooltip');
  }
}