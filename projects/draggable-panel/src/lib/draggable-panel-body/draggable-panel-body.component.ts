import { Component } from '@angular/core';
import { PanelBodyComponent } from 'panel';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'draggable-panel-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-panel-body.component.html',
  styleUrl: './draggable-panel-body.component.scss'
})
export class DraggablePanelBodyComponent extends PanelBodyComponent {
  
}