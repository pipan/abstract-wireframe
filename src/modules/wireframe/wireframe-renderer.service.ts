import { Node, NodeComponentResolver, NodeComponent } from "../document";
import { Injectable, ComponentFactory, ComponentRef } from "@angular/core";
import { WireframeDirective } from "./wireframe.directive";
import { Tree } from "../common";

@Injectable()
export class WireframeRenderer
{
    constructor(
        protected nodeComponentResolver: NodeComponentResolver
    ) {}

    render(wireframeBody: WireframeDirective, nodes: Array<Tree<Node>>): Array<NodeComponent>
    {
        let viewContainerRef = wireframeBody.viewContainerRef;
        viewContainerRef.clear();

        let nodeComponents: Array<NodeComponent> = [];
        for (let i = 0; i < nodes.length; i++) {
            let componentFactory: ComponentFactory<NodeComponent> = this.nodeComponentResolver.resolve(nodes[i].get());
            let componentRef: ComponentRef<NodeComponent> = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.setTree(nodes[i]);
            componentRef.changeDetectorRef.detectChanges();
            nodeComponents.push(componentRef.instance);
        }
        return nodeComponents;
    }
}