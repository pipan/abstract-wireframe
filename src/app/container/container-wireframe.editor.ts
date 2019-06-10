import { WireframeEditorInterface } from "src/modules/wireframe";
import { Node } from "src/modules/document";
import { Component } from "@angular/core";
import { ContainerNode } from "./container.node";

@Component({
    selector: 'containerWireframeEditor',
    templateUrl: 'container-wireframe.editor.html'
})
export class ContainerWireframeEditor implements WireframeEditorInterface
{
    public node: ContainerNode;

    setNode(node: Node): void
    {
        this.node = (node as ContainerNode);
    }
}