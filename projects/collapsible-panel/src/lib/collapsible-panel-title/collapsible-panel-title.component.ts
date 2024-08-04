import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'collapsible-panel-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel-title.component.html',
  styleUrl: './collapsible-panel-title.component.scss'
})
export class CollapsiblePanelTitleComponent {
  // Inputs
  public fontSize = input<string>();
  public fontWeight = input<string>();
  public fontFamily = input<string>();
}