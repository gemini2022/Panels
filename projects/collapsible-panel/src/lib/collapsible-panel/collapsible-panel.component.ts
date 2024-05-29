import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, booleanAttribute, contentChild, inject, input, viewChild } from '@angular/core';
import { CollapsiblePanelBarComponent } from '../collapsible-panel-bar/collapsible-panel-bar.component';
import { CollapsiblePanelBaseComponent } from '../collapsible-panel-base/collapsible-panel-base.component';
import { CollapsiblePanelArrowComponent } from '../collapsible-panel-arrow/collapsible-panel-arrow.component';

@Component({
  selector: 'collapsible-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel.component.html',
  styleUrl: './collapsible-panel.component.scss'
})
export class CollapsiblePanelComponent {
  // Inputs
  public width = input<string>();
  public isExpanded = input(true);
  public barHeight = input<string>();
  public barPadding = input<string>();
  public basePadding = input<string>();
  public borderRadius = input<string>();
  public barBorderWidth = input<string>();
  public baseBorderWidth = input<string>();
  public barHoverDisabled = input(false, { transform: booleanAttribute });

  // Private
  private _isExpanded!: boolean;
  private renderer = inject(Renderer2);
  private bar = contentChild(CollapsiblePanelBarComponent);
  private base = contentChild(CollapsiblePanelBaseComponent);
  private panel = viewChild<ElementRef<HTMLElement>>('panel');
  private arrow = contentChild(CollapsiblePanelArrowComponent);



  private ngOnInit(): void {
    this.setBarHeight();
    this.setIsExpanded();
    this.setBarPadding();
    this.setBasePadding();
    this.setBarHoverable();
    this.setBorderRadius();
    this.setBarBorderWidth();
    this.setBaseBorderWidth();
    this.setBarClickSubscription();
  }



  private setBarHeight(): void {
    if (this.barHeight()) this.bar()?.setHeight(this.barHeight()!);
  }



  private setIsExpanded(): void {
    this._isExpanded = this.isExpanded();
    this.base()?.setIsExpanded(this._isExpanded);
    this.arrow()?.setIsExpanded(this._isExpanded);
  }



  private setBarPadding(): void {
    const padding = this.barPadding() ? this.barPadding() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-bar-padding');
    this.bar()?.setPadding(padding!);
  }



  private setBarHoverable(): void {
    this.bar()?.disableHover(this.barHoverDisabled());
  }



  private setBorderRadius(): void {
    const borderRadius = this.borderRadius() ? this.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-border-radius');
    this.renderer.setStyle(this.panel()?.nativeElement, 'border-radius', borderRadius);
    this.bar()?.setBorderRadius(this.panel()?.nativeElement.style.borderTopLeftRadius!, this.panel()?.nativeElement.style.borderTopRightRadius!);
    this.base()?.setBorderRadius(this.panel()?.nativeElement.style.borderBottomLeftRadius!, this.panel()?.nativeElement.style.borderBottomRightRadius!);
  }



  private setBarBorderWidth(): void {
    const borderWidth = this.barBorderWidth() ? this.barBorderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-bar-border-width');
    this.bar()?.setBorderWidth(borderWidth!);
  }



  private setBasePadding(): void {
    const padding = this.basePadding() ? this.basePadding() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-base-padding');
    this.base()?.setPadding(padding!);
  }



  private setBaseBorderWidth(): void {
    const borderWidth = this.baseBorderWidth() ? this.baseBorderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-base-border-width');
    this.base()?.setBorderWidth(borderWidth!);
  }



  private setBarClickSubscription(): void {
    this.bar()?.clickedEvent.subscribe(() => {
      this._isExpanded = !this._isExpanded;
      this.base()?.expandCollapse(this._isExpanded);
      this.arrow()?.expandCollapse(this._isExpanded);
    })
  }
}