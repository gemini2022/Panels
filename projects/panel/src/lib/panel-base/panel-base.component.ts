import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'panel-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-base.component.html',
  styleUrl: './panel-base.component.scss'
})
export class PanelBaseComponent {
  protected padding!: string;
  protected borderWidth!: string;
  protected baseHeight = signal(-1);
  protected borderBottomLeftRadius!: string;
  protected borderBottomRightRadius!: string;


  public setPadding(padding: string) {
    this.padding = padding;
  }

  

  public setBorderWidth(borderWidth: string) {
    this.borderWidth = borderWidth;
  }



  public setHeight(baseHeight: number): void {
    this.baseHeight.set(baseHeight);
  }



  public setBorderRadius(borderBottomLeftRadius: string, borderBottomRightRadius: string) {
    this.borderBottomLeftRadius = borderBottomLeftRadius;
    this.borderBottomRightRadius = borderBottomRightRadius;
  }
}