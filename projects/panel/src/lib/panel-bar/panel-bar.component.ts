import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, input, Renderer2, viewChild } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

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
  private borderTopWidth!: number;
  private borderRightWidth!: number;
  private borderBottomWidth!: number;
  protected renderer = inject(Renderer2);
  protected borderTopLeftRadius!: string;
  protected borderTopRightRadius!: string;
  protected panel = inject(PanelComponent);
  protected bar = viewChild<ElementRef<HTMLElement>>('bar');
  protected border = viewChild<ElementRef<HTMLElement>>('border');
  protected background = viewChild<ElementRef<HTMLElement>>('background');



  private ngOnInit(): void {
    this.setBorderWidth();
    this.setBorderRadius();
    this.setHeight();
  }



  private setBorderWidth(): void {
    const borderWidth = this.borderWidth() ? this.borderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--panel-bar-border-width');
    this.renderer.setStyle(this.bar()?.nativeElement, 'border-width', borderWidth);
    this.borderTopWidth = parseInt(getComputedStyle(this.bar()!.nativeElement).borderTopWidth);
    this.borderRightWidth = parseInt(getComputedStyle(this.bar()!.nativeElement).borderRightWidth);
    this.borderBottomWidth = parseInt(getComputedStyle(this.bar()!.nativeElement).borderBottomWidth);
    this.renderer.setStyle(this.bar()?.nativeElement, 'border', 'none');
  }



  private setBorderRadius() {
    const borderRadius = this.panel.borderRadius() ? this.panel.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--panel-border-radius');
    this.renderer.setStyle(this.bar()?.nativeElement, 'border-radius', borderRadius);
    const borderTopLeftRadius = getComputedStyle(this.bar()!.nativeElement).borderTopLeftRadius;
    const borderTopRightRadius = getComputedStyle(this.bar()!.nativeElement).borderTopRightRadius;
    this.renderer.setStyle(this.border()?.nativeElement, 'border-top-left-radius', borderTopLeftRadius);
    this.renderer.setStyle(this.border()?.nativeElement, 'border-top-right-radius', borderTopRightRadius);
    this.renderer.setStyle(this.background()?.nativeElement, 'border-top-left-radius', (parseInt(borderTopLeftRadius) - this.borderTopWidth) + 'px');
    this.renderer.setStyle(this.background()?.nativeElement, 'border-top-right-radius', (parseInt(borderTopRightRadius) - this.borderRightWidth) + 'px');
  }



  private setHeight(): void {
    const height = this.height() ? this.height() : getComputedStyle(document.documentElement).getPropertyValue('--panel-bar-height');
    this.renderer.setStyle(this.background()?.nativeElement, 'height', height);
    const computedHeight = parseInt(getComputedStyle(this.background()!.nativeElement).height);
    this.renderer.setStyle(this.background()?.nativeElement, 'height', (computedHeight - this.borderTopWidth - this.borderBottomWidth) + 'px');
  }
}