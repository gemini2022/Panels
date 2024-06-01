import { CommonModule } from '@angular/common';
import { PanelBarComponent } from '../panel-bar/panel-bar.component';
import { PanelBodyComponent } from '../panel-body/panel-body.component';
import { Component, ElementRef, Renderer2, contentChild, inject, input, viewChild } from '@angular/core';

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
  protected bar = contentChild(PanelBarComponent);
  protected body = contentChild(PanelBodyComponent);
  protected panel = viewChild<ElementRef<HTMLElement>>('panel');



  protected ngOnInit(): void {
    this.setBorderRadius();
  }



  protected ngAfterViewInit() {
    this.setHeight();
  }



  private setHeight(): void {
    if (getComputedStyle(document.documentElement).getPropertyValue('--' + this._panelType + '-height') || this.height()) {
      const panelHeight = this.panel()?.nativeElement.offsetHeight;
      this.body()?.setHeight(panelHeight! - this.bar()?.getHeight()!);
    }
  }



  private setBorderRadius(): void {
    const borderRadius = this.borderRadius() ? this.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--' + this._panelType + '-border-radius');
    this.renderer.setStyle(this.panel()?.nativeElement, 'border-radius', borderRadius);
    this.bar()?.setBorderRadius(this.panel()?.nativeElement.style.borderTopLeftRadius!, this.panel()?.nativeElement.style.borderTopRightRadius!);
    this.body()?.setBorderRadius(this.panel()?.nativeElement.style.borderBottomLeftRadius!, this.panel()?.nativeElement.style.borderBottomRightRadius!);
  }
}