import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, inject, viewChild } from '@angular/core';

@Component({
  selector: 'collapsible-panel-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel-body.component.html',
  styleUrl: './collapsible-panel-body.component.scss'
})
export class CollapsiblePanelBodyComponent {
  protected padding!: string;
  private isExpanded!: boolean;
  protected borderWidth!: string;
  private bodyScrollHeight!: number;
  private renderer = inject(Renderer2);
  protected borderBottomLeftRadius!: string;
  protected borderBottomRightRadius!: string;
  private body = viewChild<ElementRef<HTMLElement>>('body');


  public setPadding(padding: string) {
    this.padding = padding;
  }
  
  
  
  public setIsExpanded(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.renderer.setStyle(this.body()!.nativeElement, 'height', (isExpanded ? this.body()?.nativeElement.scrollHeight! : 0) + 'px');
  }



  public setBorderWidth(borderWidth: string) {
    this.borderWidth = borderWidth;
  }


  
  protected getBodyHeight(body: HTMLElement) {
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



  public setBorderRadius(borderBottomLeftRadius: string, borderBottomRightRadius: string) {
    this.borderBottomLeftRadius = borderBottomLeftRadius;
    this.borderBottomRightRadius = borderBottomRightRadius;
  }



  public expandCollapse(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.bodyScrollHeight = this.body()?.nativeElement.scrollHeight!;
    this.renderer.setStyle(this.body()?.nativeElement, 'transition', 'height 0.2s');
    this.renderer.setStyle(this.body()!.nativeElement, 'height', isExpanded ? this.body()?.nativeElement.scrollHeight! + 'px' : 0);
  }
}