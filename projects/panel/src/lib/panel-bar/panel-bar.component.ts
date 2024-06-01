import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'panel-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-bar.component.html',
  styleUrl: './panel-bar.component.scss'
})
export class PanelBarComponent {
  // Inputs
  public height = input<string>();
  public padding = input<string>();
  public borderWidth = input<string>();

  // Private
  protected borderTopLeftRadius!: string;
  protected borderTopRightRadius!: string;
  protected bar = viewChild<ElementRef<HTMLElement>>('bar');

  
  
  public getHeight(): number {
    return this.bar()?.nativeElement.offsetHeight!;
  }



  public setBorderRadius(topLeft: string, topRight: string) {
    this.borderTopLeftRadius = topLeft;
    this.borderTopRightRadius = topRight;
  }
}