import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';

@Component({
  selector: 'collapsible-panel-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel-bar.component.html',
  styleUrl: './collapsible-panel-bar.component.scss'
})
export class CollapsiblePanelBarComponent {
  // Output
  public clickedEvent = output();

  // Private
  protected height!: string;
  protected hoverDisabled!: boolean;
  


  public setHeight(barHeight: string): void {
    this.height = barHeight;
  }



  public disableHover(hoverDisabled: boolean): void {
    this.hoverDisabled = hoverDisabled;
  }
}