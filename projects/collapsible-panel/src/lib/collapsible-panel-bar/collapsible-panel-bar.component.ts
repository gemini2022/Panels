import { PanelBarComponent } from 'panel';
import { CommonModule } from '@angular/common';
import { Component, booleanAttribute, input, output } from '@angular/core';

@Component({
  selector: 'collapsible-panel-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel-bar.component.html',
  styleUrl: './collapsible-panel-bar.component.scss'
})
export class CollapsiblePanelBarComponent extends PanelBarComponent {
  // Output
  public clickedEvent = output();
}