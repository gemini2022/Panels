import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, inject, viewChild } from '@angular/core';

@Component({
  selector: 'collapsible-panel-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel-base.component.html',
  styleUrl: './collapsible-panel-base.component.scss'
})
export class CollapsiblePanelBaseComponent {
  protected padding!: string;
  private isExpanded!: boolean;
  protected borderWidth!: string;
  private baseScrollHeight!: number;
  private renderer = inject(Renderer2);
  protected borderBottomLeftRadius!: string;
  protected borderBottomRightRadius!: string;
  private base = viewChild<ElementRef<HTMLElement>>('base');


  public setPadding(padding: string) {
    this.padding = padding;
  }
  
  
  
  public setIsExpanded(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.renderer.setStyle(this.base()!.nativeElement, 'height', (isExpanded ? this.base()?.nativeElement.scrollHeight! : 0) + 'px');
  }



  public setBorderWidth(borderWidth: string) {
    this.borderWidth = borderWidth;
  }


  
  protected getBaseHeight(base: HTMLElement) {
    if (base.scrollHeight !== this.baseScrollHeight) {
      this.baseScrollHeight = base.scrollHeight;
      this.updateHeight();
    }
  }



  private updateHeight(): void {
    if (this.isExpanded) {
      this.renderer.setStyle(this.base()?.nativeElement, 'transition', 'none');
      setTimeout(() => {
        this.renderer.setStyle(this.base()!.nativeElement, 'height', this.base()?.nativeElement.scrollHeight! + 'px');
      });
    }
  }



  public setBorderRadius(borderBottomLeftRadius: string, borderBottomRightRadius: string) {
    this.borderBottomLeftRadius = borderBottomLeftRadius;
    this.borderBottomRightRadius = borderBottomRightRadius;
  }



  public expandCollapse(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.baseScrollHeight = this.base()?.nativeElement.scrollHeight!;
    this.renderer.setStyle(this.base()?.nativeElement, 'transition', 'height 0.2s');
    this.renderer.setStyle(this.base()!.nativeElement, 'height', isExpanded ? this.base()?.nativeElement.scrollHeight! + 'px' : 0);
  }
}