import { PanelBodyComponent } from 'panel';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, inject, viewChild } from '@angular/core';

@Component({
  selector: 'collapsible-panel-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel-body.component.html',
  styleUrl: './collapsible-panel-body.component.scss'
})
export class CollapsiblePanelBodyComponent extends PanelBodyComponent {
  private borderTop!: number;
  private bodyHeight!: string;
  private isExpanded!: boolean;
  private borderBottom!: number;
  private newBodyHeight!: string;
  private transitionSpeed!: string;
  private renderer = inject(Renderer2);
  private border = viewChild<ElementRef<HTMLElement>>('border');
  private container = viewChild<ElementRef<HTMLElement>>('container');
  private background = viewChild<ElementRef<HTMLElement>>('background');



  public setIsExpanded(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.borderTop = this.getBorderTopWidth(this.border()?.nativeElement!);
    this.borderBottom = this.getBorderBottomWidth(this.border()?.nativeElement!);
    this.newBodyHeight = (this.background()!.nativeElement.offsetHeight + this.borderTop + this.borderBottom) + 'px';
    this.bodyHeight = this.newBodyHeight;
    this.renderer.setStyle(this.container()!.nativeElement, 'height', isExpanded ? this.bodyHeight : 0);
  }



  public setTransitionSpeed(transitionSpeed: string) {
    this.transitionSpeed = transitionSpeed;
  }



  protected getHeight(background: HTMLElement) {
    this.newBodyHeight = (background.offsetHeight + this.borderTop + this.borderBottom) + 'px';
    if (this.bodyHeight !== this.newBodyHeight) {
      this.bodyHeight = this.newBodyHeight;
      this.updateHeight();
    }
  }



  private updateHeight(): void {
    if (this.isExpanded) {
      this.renderer.setStyle(this.container()?.nativeElement, 'transition', 'none');
      setTimeout(() => {
        this.renderer.setStyle(this.container()!.nativeElement, 'height', this.bodyHeight);
      });
    }
  }



  public expandCollapse(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.renderer.setStyle(this.container()?.nativeElement, 'transition', 'height ' + this.transitionSpeed);
    this.renderer.setStyle(this.container()!.nativeElement, 'height', isExpanded ? this.bodyHeight : 0);
  }
}