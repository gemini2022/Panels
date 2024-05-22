import { CommonModule } from '@angular/common';
import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'panel-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-bar.component.html',
  styleUrl: './panel-bar.component.scss'
})
export class PanelBarComponent {
  // Private
  protected height!: string;
  protected hoverDisabled!: boolean;
  private container = viewChild<ElementRef<HTMLElement>>('container');


  public getHeight(): number {
    return this.container()?.nativeElement.offsetHeight!;
  }



  public setHeight(barHeight: string): void {
    this.height = barHeight;
  }



  public disableHover(hoverDisabled: boolean) {
    this.hoverDisabled = hoverDisabled;
  }
}