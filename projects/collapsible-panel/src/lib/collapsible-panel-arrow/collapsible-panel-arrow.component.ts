import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'collapsible-panel-arrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel-arrow.component.html',
  styleUrl: './collapsible-panel-arrow.component.scss'
})
export class CollapsiblePanelArrowComponent {
  protected isExpanded!: boolean;



  public setIsExpanded(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
  }


  public expandCollapse(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
  }
}