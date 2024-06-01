import { PanelComponent } from 'panel';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, contentChild, input, viewChild } from '@angular/core';
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
  // Inputs
  public isExpanded = input(true);
  

  // Private
  private _isExpanded!: boolean;
  protected override _panelType: string = 'collapsible-panel';
  private arrow = contentChild(CollapsiblePanelArrowComponent);
  protected override bar = contentChild(CollapsiblePanelBarComponent);
  protected override body = contentChild(CollapsiblePanelBodyComponent);
  protected override panel = viewChild<ElementRef<HTMLElement>>('panel');



  protected override ngOnInit(): void {
    super.ngOnInit();
    this.setIsExpanded();
    this.setBarClickSubscription();
  }



  private setIsExpanded(): void {
    this._isExpanded = this.isExpanded();
    this.body()?.setIsExpanded(this._isExpanded);
    this.arrow()?.setIsExpanded(this._isExpanded);
  }



  private setBarClickSubscription(): void {
    this.bar()?.clickedEvent.subscribe(() => {
      this._isExpanded = !this._isExpanded;
      this.body()?.expandCollapse(this._isExpanded);
      this.arrow()?.expandCollapse(this._isExpanded);
    })
  }
}