import { CommonModule } from '@angular/common';
import { Component, ElementRef, contentChild, effect, input, output, viewChild } from '@angular/core';
import { PanelBaseComponent } from '../panel-base/panel-base.component';
import { PanelBarComponent } from '../panel-bar/panel-bar.component';
import { PanelXButtonComponent } from '../panel-x-button/panel-x-button.component';
import { PanelMaxButtonComponent } from '../panel-max-button/panel-max-button.component';
import { PanelMinButtonComponent } from '../panel-min-button/panel-min-button.component';

@Component({
  selector: 'panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  // Inputs
  public width = input<string>();
  public height = input<string>();
  public panelBarHeight = input<string>();
  public disablePanelBarHover = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });

  // Outputs
  public xButtonClickedEvent = output();
  public maxButtonClickedEvent = output();
  public minButtonClickedEvent = output();

  // Private
  private bar = contentChild(PanelBarComponent)
  private base = contentChild(PanelBaseComponent);
  private xButton = contentChild(PanelXButtonComponent);
  private maxButton = contentChild(PanelMaxButtonComponent);
  private minButton = contentChild(PanelMinButtonComponent);
  private panel = viewChild<ElementRef<HTMLElement>>('panel');


  constructor() {
    effect(() => {
      this.setBaseHeight();
    }, { allowSignalWrites: true })
  }



  private ngOnInit(): void {
    this.setBarHeight();
    this.setXButtonClickSubscription();
    this.setMaxButtonClickSubscription();
    this.setMinButtonClickSubscription();
  }



  private setBaseHeight(): void {
    if (this.bar() && this.base()) {
      if (getComputedStyle(document.documentElement).getPropertyValue('--panel-height') || this.height()) {
        const panelHeight = this.panel()?.nativeElement.offsetHeight;
        this.base()?.setHeight(panelHeight! - this.bar()?.getHeight()!);
      }
    }
  }



  private setBarHeight(): void {
    if (this.panelBarHeight() && this.bar()) {
      this.bar()!.setHeight(this.panelBarHeight()!);
    }
  }



  private setXButtonClickSubscription(): void {
    this.xButton()?.clickedEvent.subscribe(() => {
      this.xButtonClickedEvent.emit();
    })
  }



  private setMaxButtonClickSubscription(): void {
    this.maxButton()?.clickedEvent.subscribe(() => {
      this.maxButtonClickedEvent.emit();
    })
  } 



  private setMinButtonClickSubscription(): void {
    this.minButton()?.clickedEvent.subscribe(() => {
      this.minButtonClickedEvent.emit();
    })
  }




}