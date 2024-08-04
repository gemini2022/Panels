import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, contentChild, ElementRef, inject, input, Renderer2, viewChild } from '@angular/core';
import { CollapsiblePanelBarComponent } from '../collapsible-panel-bar/collapsible-panel-bar.component';
import { CollapsiblePanelBodyComponent } from '../collapsible-panel-body/collapsible-panel-body.component';

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
  public height = input<string>();
  public borderRadius = input<string>();
  public transitionSpeed = input<string>();
  public isCollapsed = input(false, { transform: booleanAttribute });

  // Private
  private isExpanded!: boolean;
  protected renderer = inject(Renderer2);
  protected _panelType: string = 'collapsible-panel';
  private bar = contentChild(CollapsiblePanelBarComponent);
  private body = contentChild(CollapsiblePanelBodyComponent);
  protected panel = viewChild<ElementRef<HTMLElement>>('panel');



  protected ngOnInit(): void {
    this.setIsExpanded();
    this.setBorderRadius();
    this.setBarClickSubscription();
  }



  private setIsExpanded(): void {
    this.isExpanded = !this.isCollapsed();
    this.body()?.setIsExpanded(this.isExpanded);
  }



  private setBorderRadius(): void {
    const borderRadius = this.borderRadius() ? this.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--' + this._panelType + '-border-radius');
    this.renderer.setStyle(this.panel()?.nativeElement, 'border-radius', borderRadius);
  }



  private setBarClickSubscription(): void {
    this.bar()?.clickedEvent.subscribe(() => {
      this.isExpanded = !this.isExpanded;
      this.body()?.expandCollapse(this.isExpanded);
    })
  }
























  // // Input
  // public transitionSpeed = input<string>();
  // public isCollapsed = input(false, { transform: booleanAttribute });

  // // Private
  // private isExpanded!: boolean;
  // protected override _panelType: string = 'collapsible-panel';
  // private arrow = contentChild(CollapsiblePanelArrowComponent);
  // private bar = contentChild(CollapsiblePanelBarComponent);
  // private body = contentChild(CollapsiblePanelBodyComponent);
  // protected override panel = viewChild<ElementRef<HTMLElement>>('panel');



  // protected override ngOnInit(): void {
  //   super.ngOnInit();
  //   this.setIsExpanded();
  //   this.setTransitionSpeed();
  //   this.setBarClickSubscription();
  // }



  // private setIsExpanded(): void {
  //   this.isExpanded = !this.isCollapsed();
  //   this.body()?.setIsExpanded(this.isExpanded);
  //   this.arrow()?.setIsExpanded(this.isExpanded);
  // }



  // private setTransitionSpeed(): void {
  //   const transitionSpeed = this.transitionSpeed() ? this.transitionSpeed() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-transition-speed');
  //   this.body()?.setTransitionSpeed(transitionSpeed!);
  // }



  // private setBarClickSubscription(): void {
  //   this.bar()?.clickedEvent.subscribe(() => {
  //     this.isExpanded = !this.isExpanded;
  //     this.body()?.expandCollapse(this.isExpanded);
  //     this.arrow()?.expandCollapse(this.isExpanded);
  //   })
  // }
}