import { PanelComponent } from 'panel';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, booleanAttribute, contentChild, input, viewChild } from '@angular/core';
import { CollapsiblePanelBarComponent } from '../collapsible-panel-bar/collapsible-panel-bar.component';
import { CollapsiblePanelBodyComponent } from '../collapsible-panel-body/collapsible-panel-body.component';
import { CollapsiblePanelArrowComponent } from '../collapsible-panel-arrow/collapsible-panel-arrow.component';

@Component({
  selector: 'collapsible-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel.component.html',
  styleUrl: './collapsible-panel.component.scss'
})
export class CollapsiblePanelComponent extends PanelComponent {
  // Input
  public transitionSpeed = input<string>();
  public isCollapsed = input(false, { transform: booleanAttribute });

  // Private
  private isExpanded!: boolean;
  protected override _panelType: string = 'collapsible-panel';
  private arrow = contentChild(CollapsiblePanelArrowComponent);
  protected override bar = contentChild(CollapsiblePanelBarComponent);
  protected override body = contentChild(CollapsiblePanelBodyComponent);
  protected override panel = viewChild<ElementRef<HTMLElement>>('panel');



  protected override ngOnInit(): void {
    super.ngOnInit();
    this.setIsExpanded();
    this.setTransitionSpeed();
    this.setBarClickSubscription();
  }



  private setIsExpanded(): void {
    this.isExpanded = !this.isCollapsed();
    this.body()?.setIsExpanded(this.isExpanded);
    this.arrow()?.setIsExpanded(this.isExpanded);
  }



  private setTransitionSpeed(): void {
    const transitionSpeed = this.transitionSpeed() ? this.transitionSpeed() : getComputedStyle(document.documentElement).getPropertyValue('--transition-speed');
    this.body()?.setTransitionSpeed(transitionSpeed!);
  }



  private setBarClickSubscription(): void {
    this.bar()?.clickedEvent.subscribe(() => {
      this.isExpanded = !this.isExpanded;
      this.body()?.expandCollapse(this.isExpanded);
      this.arrow()?.expandCollapse(this.isExpanded);
    })
  }
}