import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'draggable-panel-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-panel-title.component.html',
  styleUrl: './draggable-panel-title.component.scss'
})
export class DraggablePanelTitleComponent {
  // Inputs
  public fontSize = input<string>();
  public fontWeight = input<string>();
  public fontFamily = input<string>();
}