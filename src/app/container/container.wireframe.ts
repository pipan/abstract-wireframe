import { Component, Input, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { WireframeDirective, WireframeRenderer } from '../../modules/wireframe';
import { NodeComponent, Node } from '../../modules/document';
import { Tree, Listener, SingleSubscriptionListener } from 'src/modules/common';

@Component({
    selector: 'containerNode',
    templateUrl: 'container.wireframe.html',
    styleUrls: ['../../modules/wireframe/wireframe.component.scss']
})
export class ContainerWireframe implements OnChanges, OnDestroy, NodeComponent {
    @Input() tree: Tree<Node>;
    @ViewChild(WireframeDirective) wireframeBody: WireframeDirective;
    protected listeners: {[key: string]: Listener<any>}; 
    public flexDirection: string = "row";

    constructor(
        protected wireframeRenderer: WireframeRenderer
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
        this.flexDirection = node.getParams().flexDirection;
    }

    protected render(tree: Tree<Node>)
    {
        this.wireframeRenderer.render(this.wireframeBody, tree.getChildren());
        this.applyParams(tree.get());
    }
}