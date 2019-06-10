import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[editor-body]' })
export class WireframeEditorDirective {
    constructor(
        public viewContainerRef: ViewContainerRef
    ) { }
}