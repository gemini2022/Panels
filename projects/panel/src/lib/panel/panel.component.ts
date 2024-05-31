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
  public barHeight = input<string>();
  public barPadding = input<string>();
  public bodyPadding = input<string>();
  public borderRadius = input<string>();
  public barBorderWidth = input<string>();
  public bodyBorderWidth = input<string>();

  // Private
  protected _panel: string = 'panel';
  private renderer = inject(Renderer2);
  private bar = contentChild(PanelBarComponent);
  private body = contentChild(PanelBodyComponent);
  private panel = viewChild<ElementRef<HTMLElement>>('panel');



  private ngOnInit(): void {
    this.setBarHeight();
    this.setBodyHeight();
    this.setBarPadding();
    this.setBodyPadding();
    this.setBorderRadius();
    this.setBarBorderWidth();
    this.setBodyBorderWidth();
  }



  private setBodyHeight(): void {
    if (getComputedStyle(document.documentElement).getPropertyValue('--' + this._panel + '-height') || this.height()) {
      const panelHeight = this.panel()?.nativeElement.offsetHeight;

      setTimeout(() => {
        this.body()?.setHeight(panelHeight! - this.bar()?.getHeight()!);
      });
    }
  }



  private setBarHeight(): void {
    if (this.barHeight()) this.bar()?.setHeight(this.barHeight()!);
  }



  private setBarPadding(): void {
    const padding = this.barPadding() ? this.barPadding() : getComputedStyle(document.documentElement).getPropertyValue('--' + this._panel + '-bar-padding');
    this.bar()?.setPadding(padding!);
  }



  private setBodyPadding(): void {
    const padding = this.bodyPadding() ? this.bodyPadding() : getComputedStyle(document.documentElement).getPropertyValue('--' + this._panel + '-body-padding');
    this.body()?.setPadding(padding!);
  }



  private setBorderRadius(): void {
    const borderRadius = this.borderRadius() ? this.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--' + this._panel + '-border-radius');
    this.renderer.setStyle(this.panel()?.nativeElement, 'border-radius', borderRadius);
    this.bar()?.setBorderRadius(this.panel()?.nativeElement.style.borderTopLeftRadius!, this.panel()?.nativeElement.style.borderTopRightRadius!);
    this.body()?.setBorderRadius(this.panel()?.nativeElement.style.borderBottomLeftRadius!, this.panel()?.nativeElement.style.borderBottomRightRadius!);
  }



  private setBarBorderWidth(): void {
    const borderWidth = this.barBorderWidth() ? this.barBorderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--' + this._panel + '-bar-border-width');
    this.bar()?.setBorderWidth(borderWidth!);
  }



  private setBodyBorderWidth(): void {
    const borderWidth = this.bodyBorderWidth() ? this.bodyBorderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--' + this._panel + '-body-border-width');
    this.body()?.setBorderWidth(borderWidth!);
  }
}