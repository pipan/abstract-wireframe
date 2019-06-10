import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[wireframe-body]' })
export class WireframeDirective {
    constructor(
        public viewContainerRef: ViewContainerRef
    ) { }
}