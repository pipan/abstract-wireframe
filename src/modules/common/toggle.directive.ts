import { Directive, ViewChild, ViewContainerRef, HostListener, ElementRef, ContentChild, Renderer2 } from '@angular/core';

@Directive({ selector: '[toggle]' })
export class ToggleDirective {
    @ContentChild("toToggle") toToggle: ElementRef

    constructor(
        protected renderer: Renderer2
    ) { }

    @HostListener('click')
    toggle(): void
    {
        if (this.toToggle.nativeElement.style.display == "none") {
            this.renderer.setStyle(this.toToggle.nativeElement, 'display', "");
        } else {
            this.renderer.setStyle(this.toToggle.nativeElement, 'display', "none");
        }
    }
}