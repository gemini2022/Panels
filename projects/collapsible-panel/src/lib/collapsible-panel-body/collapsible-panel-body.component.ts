import { CommonModule } from "@angular/common";
import { Component, input, signal, inject, Renderer2, viewChild, ElementRef, effect } from "@angular/core";
import { CollapsiblePanelComponent } from "../collapsible-panel/collapsible-panel.component";

@Component({
  selector: 'collapsible-panel-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-panel-body.component.html',
  styleUrl: './collapsible-panel-body.component.scss'
})
export class CollapsiblePanelBodyComponent {
  // Inputs
  public padding = input<string>();
  public borderWidth = input<string>();

  // Private
  private bodyHeight!: string;
  private isExpanded!: boolean;
  protected barHeight!: number;
  protected height = signal('');
  private newBodyHeight!: string;
  private transitionSpeed!: string;
  private borderLeftWidth!: number;
  private borderBottomWidth!: number;
  protected renderer = inject(Renderer2);
  protected panel = inject(CollapsiblePanelComponent);
  protected body = viewChild<ElementRef<HTMLElement>>('body');
  protected border = viewChild<ElementRef<HTMLElement>>('border');
  protected background = viewChild<ElementRef<HTMLElement>>('background');



  constructor() {
    effect(() => {
      this.setHeight();
    }, { allowSignalWrites: true })
  }



  private ngOnInit(): void {
    this.getBarHeight();
    this.setBorderWidth();
    this.setBorderRadius();
    this.setTransitionSpeed();
  }



  private getBarHeight(): void {
    this.barHeight = this.body()?.nativeElement.parentElement?.parentElement?.offsetHeight! - this.body()!.nativeElement.offsetHeight;
  }



  private setBorderWidth(): void {
    const borderWidth = this.borderWidth() ? this.borderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-body-border-width');
    this.renderer.setStyle(this.body()?.nativeElement, 'border-width', borderWidth);
    this.borderLeftWidth = parseInt(getComputedStyle(this.body()!.nativeElement).borderLeftWidth);
    this.borderBottomWidth = parseInt(getComputedStyle(this.body()!.nativeElement).borderBottomWidth);
    this.renderer.setStyle(this.body()?.nativeElement, 'border', 'none');
  }



  private setBorderRadius() {
    const borderRadius = this.panel.borderRadius() ? this.panel.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-border-radius');
    this.renderer.setStyle(this.body()?.nativeElement, 'border-radius', borderRadius);
    const borderBottomLeftRadius = getComputedStyle(this.body()!.nativeElement).borderBottomLeftRadius;
    const borderBottomRightRadius = getComputedStyle(this.body()!.nativeElement).borderBottomRightRadius;
    this.renderer.setStyle(this.body()?.nativeElement, 'border-top-left-radius', '0px');
    this.renderer.setStyle(this.body()?.nativeElement, 'border-top-right-radius', '0px');
    this.renderer.setStyle(this.border()?.nativeElement, 'border-bottom-left-radius', borderBottomLeftRadius);
    this.renderer.setStyle(this.border()?.nativeElement, 'border-bottom-right-radius', borderBottomRightRadius);
    this.renderer.setStyle(this.background()?.nativeElement, 'border-bottom-left-radius', (parseInt(borderBottomLeftRadius) - this.borderLeftWidth) + 'px');
    this.renderer.setStyle(this.background()?.nativeElement, 'border-bottom-right-radius', (parseInt(borderBottomRightRadius) - this.borderBottomWidth) + 'px');
  }



  private setTransitionSpeed(): void {
    const transitionSpeed = this.panel.transitionSpeed() ? this.panel.transitionSpeed() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-transition-speed');
    this.transitionSpeed = transitionSpeed!;
  }



  private setHeight(): void {
    const panelHeight = this.panel.height() ? this.panel.height() : getComputedStyle(document.documentElement).getPropertyValue('--collapsible-panel-height');

    if (panelHeight) {
      this.renderer.setStyle(this.body()?.nativeElement, 'maxHeight', panelHeight);
      const computedPanelHeight = parseInt(getComputedStyle(this.body()!.nativeElement).maxHeight);
      const bodyHeight = computedPanelHeight - this.barHeight - this.borderBottomWidth;
      this.height.set(bodyHeight.toString());
    }
  }



  protected getHeight(background: HTMLElement) {
    this.newBodyHeight = (background.offsetHeight + this.borderBottomWidth) + 'px';
    if (this.bodyHeight !== this.newBodyHeight) {
      this.bodyHeight = this.newBodyHeight;
      this.updateHeight();
    }
  }



  private updateHeight(): void {
    if (this.isExpanded) {
      this.renderer.setStyle(this.body()?.nativeElement, 'transition', 'none');
      setTimeout(() => {
        this.renderer.setStyle(this.body()!.nativeElement, 'height', this.bodyHeight);
      });
    }
  }



  public setIsExpanded(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.newBodyHeight = (this.background()!.nativeElement.offsetHeight + this.borderBottomWidth) + 'px';
    this.bodyHeight = this.newBodyHeight;
    this.renderer.setStyle(this.body()!.nativeElement, 'height', isExpanded ? this.bodyHeight : 0);
  }



  public expandCollapse(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.renderer.setStyle(this.body()?.nativeElement, 'transition', 'height ' + this.transitionSpeed);
    this.renderer.setStyle(this.body()!.nativeElement, 'height', isExpanded ? this.bodyHeight : 0);
  }



























  // private borderTop!: number;
  // private bodyHeight!: string;
  // private isExpanded!: boolean;
  // private borderBottom!: number;
  // private newBodyHeight!: string;
  // private transitionSpeed!: string;
  // protected override renderer = inject(Renderer2);
  // private border = viewChild<ElementRef<HTMLElement>>('border');
  // private container = viewChild<ElementRef<HTMLElement>>('container');
  // private background = viewChild<ElementRef<HTMLElement>>('background');



  // public setIsExpanded(isExpanded: boolean): void {
  //   this.isExpanded = isExpanded;
  //   this.borderTop = this.getBorderTopWidth(this.border()?.nativeElement!);
  //   this.borderBottom = this.getBorderBottomWidth(this.border()?.nativeElement!);
  //   this.newBodyHeight = (this.background()!.nativeElement.offsetHeight + this.borderTop + this.borderBottom) + 'px';
  //   this.bodyHeight = this.newBodyHeight;
  //   this.renderer.setStyle(this.container()!.nativeElement, 'height', isExpanded ? this.bodyHeight : 0);
  // }



  // public setTransitionSpeed(transitionSpeed: string) {
  //   this.transitionSpeed = transitionSpeed;
  // }



  // protected getHeight(background: HTMLElement) {
  //   this.newBodyHeight = (background.offsetHeight + this.borderTop + this.borderBottom) + 'px';
  //   if (this.bodyHeight !== this.newBodyHeight) {
  //     this.bodyHeight = this.newBodyHeight;
  //     this.updateHeight();
  //   }
  // }



  // private updateHeight(): void {
  //   if (this.isExpanded) {
  //     this.renderer.setStyle(this.container()?.nativeElement, 'transition', 'none');
  //     setTimeout(() => {
  //       this.renderer.setStyle(this.container()!.nativeElement, 'height', this.bodyHeight);
  //     });
  //   }
  // }



  // public expandCollapse(isExpanded: boolean): void {
  //   this.isExpanded = isExpanded;
  //   this.renderer.setStyle(this.container()?.nativeElement, 'transition', 'height ' + this.transitionSpeed);
  //   this.renderer.setStyle(this.container()!.nativeElement, 'height', isExpanded ? this.bodyHeight : 0);
  // }
}