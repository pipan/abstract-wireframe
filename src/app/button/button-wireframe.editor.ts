import { Node } from "src/modules/document";
import { Component } from "@angular/core";
import { ButtonNode } from "./button.node";

@Component({
    selector: 'buttonWireframeEditor',
    templateUrl: 'button-wireframe.editor.html',
    inputs: ['node']
})
export class ButtonWireframeEditor
{
    public node: ButtonNode;

    setNode(node: Node): void
    {
        this.node = (node as ButtonNode);
    }
}