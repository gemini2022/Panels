import { CommonModule } from "@angular/common";
import { Component, input, inject, Renderer2, viewChild, ElementRef, booleanAttribute } from "@angular/core";


@Component({
  selector: 'draggable-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-panel.component.html',
  styleUrl: './draggable-panel.component.scss'
})
export class DraggablePanelComponent {
  // Inputs
  public width = input<string>();
  public height = input<string>();
  public borderRadius = input<string>();
  public dragDisabled = input(false, { transform: booleanAttribute });

  // Private
  private barHeight!: number;
  private isDragging!: boolean;
  private stopPropagation!: boolean;
  private dragOffset = { x: 0, y: 0 };
  protected renderer = inject(Renderer2);
  private removeMouseDownListener!: () => void;
  protected _panelType: string = 'draggable-panel';
  private removeWindowMouseUpListener!: () => void;
  private removeWindowMouseMoveListener!: () => void;
  protected panel = viewChild<ElementRef<HTMLElement>>('panel');



  protected ngOnInit(): void {
    this.setPanelDrag();
    this.setBorderRadius();

  }



  ngAfterViewInit() {
    this.barHeight = (this.panel()?.nativeElement.firstChild?.firstChild as HTMLElement).offsetHeight;
  }



  private setPanelDrag(): void {
    if (!this.dragDisabled()) {
      this.removeMouseDownListener = this.renderer.listen(this.panel()?.nativeElement, 'mousedown', ((e: MouseEvent) => this.onBarMouseDown(e)));
    }
  }



  private setBorderRadius(): void {
    const borderRadius = this.borderRadius() ? this.borderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--' + this._panelType + '-border-radius');
    this.renderer.setStyle(this.panel()?.nativeElement, 'border-radius', borderRadius);
  }



  private onBarMouseDown(e: MouseEvent) {
    if (!this.stopPropagation) {
      this.isDragging = true;
      this.dragOffset.x = e.clientX - this.panel()?.nativeElement.getBoundingClientRect().left!;
      this.dragOffset.y = e.clientY - this.panel()?.nativeElement.getBoundingClientRect().top!;

      if (this.dragOffset.y <= this.barHeight) {
        this.removeWindowMouseUpListener = this.renderer.listen('window', 'mouseup', () => this.onWindowMouseUp());
        this.removeWindowMouseMoveListener = this.renderer.listen('window', 'mousemove', (e: MouseEvent) => this.onWindowMouseMove(e));
      }
    } else {
      this.stopPropagation = false;
    }
  }



  private onWindowMouseUp(): void {
    this.isDragging = false
    this.removeWindowMouseUpListener();
    this.removeWindowMouseMoveListener();
  }



  private onWindowMouseMove(e: MouseEvent): void {
    if (this.isDragging) {
      this.renderer.setStyle(this.panel()?.nativeElement, 'left', (e.clientX - this.dragOffset.x) + 'px');
      this.renderer.setStyle(this.panel()?.nativeElement, 'top', (e.clientY - this.dragOffset.y) + 'px');
    }
  }



  public stopMouseDownPropagation(): void {
    this.stopPropagation = true;
  }



  private ngOnDestroy(): void {
    if (this.removeMouseDownListener) this.removeMouseDownListener();
    if (this.removeWindowMouseUpListener) this.removeWindowMouseUpListener();
    if (this.removeWindowMouseMoveListener) this.removeWindowMouseMoveListener();
  }
}