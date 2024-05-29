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
  protected padding!: string;
  protected borderWidth!: string;
  protected hoverDisabled!: boolean;
  protected borderTopLeftRadius!: string;
  protected borderTopRightRadius!: string;



  public setHeight(barHeight: string): void {
    this.height = barHeight;
  }



  public setPadding(padding: string) {
    this.padding = padding;
  }



  public setBorderWidth(borderWidth: string) {
    this.borderWidth = borderWidth;
  }



  public disableHover(hoverDisabled: boolean): void {
    this.hoverDisabled = hoverDisabled;
  }



  public setBorderRadius(borderTopLeftRadius: string, borderTopRightRadius: string) {
    this.borderTopLeftRadius = borderTopLeftRadius;
    this.borderTopRightRadius = borderTopRightRadius;
  }
}