import { Node } from "src/modules/document";
import { Component } from "@angular/core";
import { ContainerNode } from "./container.node";

@Component({
    selector: 'containerWireframeEditor',
    templateUrl: 'container-wireframe.editor.html',
    inputs: ['node']
})
export class ContainerWireframeEditor
{
    public node: ContainerNode;

    setNode(node: Node): void
    {
        this.node = (node as ContainerNode);
    }
}