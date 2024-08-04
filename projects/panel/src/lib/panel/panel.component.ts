import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, inject, input, viewChild } from '@angular/core';

@Component({
  selector: 'panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  // Inputs
  public width = input<string>();
  public height = input<string>();
  public borderRadius = input<string>();

  // Private
  protected _panelType: string = 'panel';
  protected renderer = inject(Renderer2);
  protected panel = viewChild<ElementRef<HTMLElement>>('panel');



  protected ngOnInit(): void {
    this.setBorderRadius();
  }



  private setBorderRadius(): void {
    const borderRadius = this.borderRadius() ? this.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--' + this._panelType + '-border-radius');
    this.renderer.setStyle(this.panel()?.nativeElement, 'border-radius', borderRadius);
  }
}