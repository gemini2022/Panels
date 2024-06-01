import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'panel-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-body.component.html',
  styleUrl: './panel-body.component.scss'
})
export class PanelBodyComponent {
  // Inputs
  public padding = input<string>();
  public borderWidth = input<string>();

  // Private
  protected height = signal(-1);
  protected borderBottomLeftRadius!: string;
  protected borderBottomRightRadius!: string;


  public setHeight(height: number): void {
    this.height.set(height);
  }



  public setBorderRadius(borderBottomLeftRadius: string, borderBottomRightRadius: string) {
    this.borderBottomLeftRadius = borderBottomLeftRadius;
    this.borderBottomRightRadius = borderBottomRightRadius;
  }



  protected getBorderBottomWidth(border: HTMLElement): number {
    return parseInt(getComputedStyle(border).getPropertyValue('padding-bottom'));
  }
}