import { Component, signal } from '@angular/core';

@Component({
  selector: 'panel-base',
  standalone: true,
  imports: [],
  templateUrl: './panel-base.component.html',
  styleUrl: './panel-base.component.scss'
})
export class PanelBaseComponent {
  protected baseTop = signal(0);
  protected baseWidth = signal(0);
  protected baseHeight = signal(-1);


  public setHeight(baseHeight: number): void {
    this.baseHeight.set(baseHeight);
  }
}