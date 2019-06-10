import { Component, OnInit, ViewChild, OnChanges, Input, ComponentFactory, ComponentRef } from '@angular/core';
import { WireframeEditorDirective } from './wireframe-editor.directive';
import { StringComponentResolver } from '../../common';
import { Node } from '../../document';
import { WireframeEditorInterface } from './editor.interface';

@Component({
    selector: 'wireframeEditor',
    templateUrl: 'wireframe-editor.component.html'
})

export class WireframeEditorComponent implements OnInit, OnChanges {
    @Input() node: Node;
    @ViewChild(WireframeEditorDirective) editorBody: WireframeEditorDirective;

    constructor(
        protected stringComponentResolver: StringComponentResolver
    ) { }

    ngOnInit() { }

    ngOnChanges()
    {
        this.editorBody.viewContainerRef.clear();
        if (this.node) {
            let ComponentFactory: ComponentFactory<WireframeEditorInterface> = this.stringComponentResolver.resolve<WireframeEditorInterface>(this.node.getType() + ".editor");   
            let componentRef: ComponentRef<WireframeEditorInterface> = this.editorBody.viewContainerRef.createComponent(ComponentFactory);
            componentRef.instance.setNode(this.node);
        }
    }
}