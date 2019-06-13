import { Node } from "./node.interface";
import { Type, Injectable } from "@angular/core";

@Injectable()
export class NodeFactory
{
    protected prototypes: Map<string, Type<Node>>;

    constructor()
    {
        this.prototypes = new Map();
    }

    setPrototype(nodeType: string, classType: Type<Node>): void
    {
        this.prototypes.set(nodeType, classType);
    }

    create(nodeType: string): Node
    {
        let classType: Type<Node> = this.prototypes.get(nodeType);
        return new classType();
    }

    availableKeys(): Array<string>
    {
        return Array.from(this.prototypes.keys());
    }
}