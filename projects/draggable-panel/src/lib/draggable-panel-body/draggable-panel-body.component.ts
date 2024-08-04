import { Component, effect, ElementRef, inject, input, Renderer2, signal, viewChild } from '@angular/core';
import { PanelBodyComponent, PanelComponent } from 'panel';
import { CommonModule } from '@angular/common';
import { DraggablePanelComponent } from '../draggable-panel/draggable-panel.component';


@Component({
  selector: 'draggable-panel-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-panel-body.component.html',
  styleUrl: './draggable-panel-body.component.scss'
})
export class DraggablePanelBodyComponent {
  // Inputs
  public padding = input<string>();
  public borderWidth = input<string>();

  // Private
  protected barHeight!: number;
  protected height = signal('');
  private borderLeftWidth!: number;
  private borderBottomWidth!: number;
  protected renderer = inject(Renderer2);
  protected panel = inject(DraggablePanelComponent);
  protected body = viewChild<ElementRef<HTMLElement>>('body');
  protected border = viewChild<ElementRef<HTMLElement>>('border');
  protected background = viewChild<ElementRef<HTMLElement>>('background');



  constructor() {
    effect(() => {
      this.setHeight();
    }, { allowSignalWrites: true })
  }



  private ngOnInit(): void {
    this.getBarHeight();
    this.setBorderWidth();
    this.setBorderRadius();
  }



  private getBarHeight(): void {
    this.barHeight = this.body()?.nativeElement.parentElement?.parentElement?.offsetHeight! - this.body()!.nativeElement.offsetHeight;
  }



  private setBorderWidth(): void {
    const borderWidth = this.borderWidth() ? this.borderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--panel-body-border-width');
    this.renderer.setStyle(this.body()?.nativeElement, 'border-width', borderWidth);
    this.borderLeftWidth = parseInt(getComputedStyle(this.body()!.nativeElement).borderLeftWidth);
    this.borderBottomWidth = parseInt(getComputedStyle(this.body()!.nativeElement).borderBottomWidth);
    this.renderer.setStyle(this.body()?.nativeElement, 'border', 'none');
  }



  private setBorderRadius() {
    const borderRadius = this.panel.borderRadius() ? this.panel.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--panel-border-radius');
    this.renderer.setStyle(this.body()?.nativeElement, 'border-radius', borderRadius);
    const borderBottomLeftRadius = getComputedStyle(this.body()!.nativeElement).borderBottomLeftRadius;
    const borderBottomRightRadius = getComputedStyle(this.body()!.nativeElement).borderBottomRightRadius;
    this.renderer.setStyle(this.body()?.nativeElement, 'border-top-left-radius', '0px');
    this.renderer.setStyle(this.body()?.nativeElement, 'border-top-right-radius', '0px');
    this.renderer.setStyle(this.border()?.nativeElement, 'border-bottom-left-radius', borderBottomLeftRadius);
    this.renderer.setStyle(this.border()?.nativeElement, 'border-bottom-right-radius', borderBottomRightRadius);
    this.renderer.setStyle(this.background()?.nativeElement, 'border-bottom-left-radius', (parseInt(borderBottomLeftRadius) - this.borderLeftWidth) + 'px');
    this.renderer.setStyle(this.background()?.nativeElement, 'border-bottom-right-radius', (parseInt(borderBottomRightRadius) - this.borderBottomWidth) + 'px');
  }



  private setHeight(): void {
    const panelHeight = this.panel.height() ? this.panel.height() : getComputedStyle(document.documentElement).getPropertyValue('--panel-height');

    if (panelHeight) {
      this.renderer.setStyle(this.body()?.nativeElement, 'maxHeight', panelHeight);
      const computedPanelHeight = parseInt(getComputedStyle(this.body()!.nativeElement).maxHeight);
      const bodyHeight = computedPanelHeight - this.barHeight - this.borderBottomWidth;
      this.height.set(bodyHeight.toString());
    }
  }
}