import { Component, booleanAttribute, contentChild, effect, input } from '@angular/core';
import { CollapsiblePanelBarComponent } from '../collapsible-panel-bar/collapsible-panel-bar.component';
import { CollapsiblePanelBaseComponent } from '../collapsible-panel-base/collapsible-panel-base.component';
import { CommonModule } from '@angular/common';
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
  public barHeight = input<string>();
  public barHoverDisabled = input(false, { transform: booleanAttribute });

  // Private
  private bar = contentChild(CollapsiblePanelBarComponent);
  private base = contentChild(CollapsiblePanelBaseComponent);
  private arrow = contentChild(CollapsiblePanelArrowComponent);


  constructor() {
    effect(() => {
      this.setBarHoverable();
    })
  }



  private ngOnInit(): void {
    this.setBarHeight();
    this.setBarClickSubscription();
  }



  private setBarHoverable(): void {
    this.bar()?.disableHover(this.barHoverDisabled());
  }



  private setBarHeight(): void {
    if (this.barHeight()) this.bar()?.setHeight(this.barHeight()!);
  }



  private setBarClickSubscription(): void {
    this.bar()?.clickedEvent.subscribe((isExpanded: boolean) => {
      this.base()?.expandCollapse(isExpanded);
      this.arrow()?.expandCollapse(isExpanded);
    })  
  }
}