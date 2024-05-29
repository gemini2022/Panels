import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, inject, output, viewChild } from '@angular/core';

@Component({
  selector: 'panel-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-bar.component.html',
  styleUrl: './panel-bar.component.scss'
})
export class PanelBarComponent {
  // Output
  public mouseDownedEvent = output<MouseEvent>();

  // Private
  protected height!: string;
  protected padding!: string;
  protected borderWidth!: string;
  protected hoverDisabled!: boolean;
  private renderer = inject(Renderer2);
  protected borderTopLeftRadius!: string;
  protected borderTopRightRadius!: string;
  private removeMouseDownListener!: () => void;
  private bar = viewChild<ElementRef<HTMLElement>>('bar');


  public getHeight(): number {
    return this.bar()?.nativeElement.offsetHeight!;
  }



  public setHeight(barHeight: string): void {
    this.height = barHeight;
  }



  public setPadding(padding: string) {
    this.padding = padding;
  }



  public setBorderWidth(borderWidth: string) {
    this.borderWidth = borderWidth;
  }



  public disableHover(hoverDisabled: boolean): void {
    this.hoverDisabled = hoverDisabled;
  }



  public setBorderRadius(topLeft: string, topRight: string) {
    this.borderTopLeftRadius = topLeft;
    this.borderTopRightRadius = topRight;
  }



  public setMouseDownListener(): void {
    this.removeMouseDownListener = this.renderer.listen(this.bar()?.nativeElement, 'mousedown', ((e: MouseEvent) => this.mouseDownedEvent.emit(e)));
  }



  public getHtmlElement(): HTMLElement {
    return this.bar()?.nativeElement!;
  }



  private ngOnDestroy(): void {
    if (this.removeMouseDownListener) this.removeMouseDownListener();
  }
}