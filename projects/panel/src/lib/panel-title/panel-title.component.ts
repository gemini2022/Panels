import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'panel-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-title.component.html',
  styleUrl: './panel-title.component.scss'
})
export class PanelTitleComponent {
  // Inputs
  public fontSize = input<string>();
  public fontWeight = input<string>();
  public fontFamily = input<string>();
}