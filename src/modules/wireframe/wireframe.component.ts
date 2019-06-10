import { Component, Input, ViewChild, OnChanges, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { WireframeDirective } from './wireframe.directive';
import { WireframeRenderer } from './wireframe-renderer.service';
import { NodeComponent, Node } from '../../modules/document';
import { Tree, Listener, SingleSubscriptionListener } from 'src/modules/common';

@Component({
    selector: 'wireframeNode',
    templateUrl: 'wireframe.component.html',
    styleUrls: ['wireframe.component.scss']
})
export class WireframeComponent implements OnChanges, OnDestroy, NodeComponent {
    @Input() tree: Tree<Node>;
    @ViewChild(WireframeDirective) wireframeBody: WireframeDirective;
    protected listeners: {[key: string]: Listener<any>}; 

    constructor(
        protected wireframeRenderer: WireframeRenderer,
        protected elementRef: ElementRef,
        protected renderer: Renderer2
    ) {
        this.listeners = {
            node: new SingleSubscriptionListener(),
            tree: new SingleSubscriptionListener()
        };
        this.listeners.node.listenFor("change", this.applyParams.bind(this));
        this.listeners.tree.listenFor("change", this.render.bind(this));
    }

    ngOnChanges(): void
    {
        this.setTree(this.tree);
    }

    ngOnDestroy(): void
    {
        for (let key in this.listeners) {
            this.listeners[key].clear()
        }
    }

    setTree(tree: Tree<Node>)
    {
        this.tree = tree;
        this.listeners.tree.listenOn(tree);
        this.listeners.node.listenOn(tree.get());
        this.render(this.tree);
    }

    protected applyParams(node: Node): void
    {
        let params: any = node.getParams();
        for (let styleName in params) {
            this.renderer.setStyle(this.elementRef.nativeElement, styleName, params[styleName]);
        }
    }

    protected render(tree: Tree<Node>)
    {
        this.wireframeRenderer.render(this.wireframeBody, tree.getChildren());
        this.applyParams(tree.get());
    }
}