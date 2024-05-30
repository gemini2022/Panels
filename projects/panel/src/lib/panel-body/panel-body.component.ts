import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'panel-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-body.component.html',
  styleUrl: './panel-body.component.scss'
})
export class PanelBodyComponent {
  protected padding!: string;
  protected borderWidth!: string;
  protected bodyHeight = signal(-1);
  protected borderBottomLeftRadius!: string;
  protected borderBottomRightRadius!: string;


  public setPadding(padding: string) {
    this.padding = padding;
  }

  

  public setBorderWidth(borderWidth: string) {
    this.borderWidth = borderWidth;
  }



  public setHeight(bodyHeight: number): void {
    this.bodyHeight.set(bodyHeight);
  }



  public setBorderRadius(borderBottomLeftRadius: string, borderBottomRightRadius: string) {
    this.borderBottomLeftRadius = borderBottomLeftRadius;
    this.borderBottomRightRadius = borderBottomRightRadius;
  }
}