import { CommonModule } from '@angular/common';
import { Component, ElementRef, contentChild, effect, input, viewChild } from '@angular/core';
import { PanelBaseComponent } from '../panel-base/panel-base.component';
import { PanelBarComponent } from '../panel-bar/panel-bar.component';
import { PanelTitleComponent } from '../panel-title/panel-title.component';

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

  // Private
  private panelBar = contentChild(PanelBarComponent)
  private panelBase = contentChild(PanelBaseComponent);
  private panel = viewChild<ElementRef<HTMLElement>>('panel');


  ngOnInit() {
    this.setBarHeight();
  }


  constructor() {
    effect(() => {
      this.setBaseHeight();
    }, { allowSignalWrites: true })
  }



  private setBarHeight(): void {
    if(this.panelBarHeight() && this.panelBar()) {
      this.panelBar()!.setHeight(this.panelBarHeight()!);
    }
  }



  private setBaseHeight(): void {
    if (this.panelBar() && this.panelBase()) {
      if (getComputedStyle(document.documentElement).getPropertyValue('--panel-height') || this.height()) {
        const panelHeight = this.panel()?.nativeElement.offsetHeight;
        this.panelBase()?.setHeight(panelHeight! - this.panelBar()?.getHeight()!);
      }
    }
  }
}