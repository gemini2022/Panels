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
  private isExpanded!: boolean;
  private bodyScrollHeight!: number;
  private renderer = inject(Renderer2);
  private body = viewChild<ElementRef<HTMLElement>>('body');


  public setIsExpanded(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.renderer.setStyle(this.body()!.nativeElement, 'height', (isExpanded ? this.body()?.nativeElement.scrollHeight! : 0) + 'px');
  }



  protected getHeight(body: HTMLElement) {
    if (body.scrollHeight !== this.bodyScrollHeight) {
      this.bodyScrollHeight = body.scrollHeight;
      this.updateHeight();
    }
  }



  private updateHeight(): void {
    if (this.isExpanded) {
      this.renderer.setStyle(this.body()?.nativeElement, 'transition', 'none');
      setTimeout(() => {
        this.renderer.setStyle(this.body()!.nativeElement, 'height', this.body()?.nativeElement.scrollHeight! + 'px');
      });
    }
  }



  public expandCollapse(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.bodyScrollHeight = this.body()?.nativeElement.scrollHeight!;
    this.renderer.setStyle(this.body()?.nativeElement, 'transition', 'height 0.2s');
    this.renderer.setStyle(this.body()!.nativeElement, 'height', isExpanded ? this.body()?.nativeElement.scrollHeight! + 'px' : 0);
  }
}