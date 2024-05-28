import { Component, ElementRef, Renderer2, inject, viewChild } from '@angular/core';

@Component({
  selector: 'collapsible-panel-base',
  standalone: true,
  imports: [],
  templateUrl: './collapsible-panel-base.component.html',
  styleUrl: './collapsible-panel-base.component.scss'
})
export class CollapsiblePanelBaseComponent {
  private isExpanded!: boolean;
  private baseScrollHeight!: number;
  private renderer = inject(Renderer2);
  private base = viewChild<ElementRef<HTMLElement>>('base');



  public setIsExpanded(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.renderer.setStyle(this.base()!.nativeElement, 'height', (isExpanded ? this.base()?.nativeElement.scrollHeight! : 0) + 'px');
  }


  
  protected getBaseHeight(base: HTMLElement) {
    if (base.scrollHeight !== this.baseScrollHeight) {
      this.baseScrollHeight = base.scrollHeight;
      this.updateHeight();
    }
  }



  public expandCollapse(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.baseScrollHeight = this.base()?.nativeElement.scrollHeight!;
    this.renderer.setStyle(this.base()?.nativeElement, 'transition', 'height 0.2s');
    this.renderer.setStyle(this.base()!.nativeElement, 'height', isExpanded ? this.base()?.nativeElement.scrollHeight! + 'px' : 0);
  }



  private updateHeight(): void {
    if (this.isExpanded) {
      this.renderer.setStyle(this.base()?.nativeElement, 'transition', 'none');
      setTimeout(() => {
        this.renderer.setStyle(this.base()!.nativeElement, 'height', this.base()?.nativeElement.scrollHeight! + 'px');
      });
    }
  }
}