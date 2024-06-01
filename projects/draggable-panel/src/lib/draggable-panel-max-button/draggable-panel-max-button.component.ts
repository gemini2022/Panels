import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggablePanelXButtonComponent } from '../draggable-panel-x-button/draggable-panel-x-button.component';

@Component({
  selector: 'draggable-panel-max-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../draggable-panel-x-button/draggable-panel-x-button.component.html',
  styleUrl: './draggable-panel-max-button.component.scss'
})
export class DraggablePanelMaxButtonComponent extends DraggablePanelXButtonComponent {
  protected override _buttonType: string = 'max';
}