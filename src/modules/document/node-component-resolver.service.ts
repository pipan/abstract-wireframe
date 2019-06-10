import { ComponentFactory, Injectable, ComponentFactoryResolver, Type } from "@angular/core";
import { Node } from './node.interface';
import { NodeComponent } from "./node.component";

@Injectable()
export class NodeComponentResolver
{
    protected nodeMap: Map<string, Type<any>>;
    protected defaultClassType: Type<any>;

    constructor(
        protected componentFactoryResolver: ComponentFactoryResolver
    )
    {
        this.nodeMap = new Map();
    }

    setDefault(classType: Type<any>): void
    {
        this.defaultClassType = classType;
    }

    resolve(node: Node): ComponentFactory<NodeComponent>
    {
        let classType: Type<any> = this.nodeMap.get(node.getType());
        if (!this.nodeMap.has(node.getType())) {
            classType = this.defaultClassType;
        }
        return this.componentFactoryResolver.resolveComponentFactory<NodeComponent>(classType);
    }

    bind(nodeType: string, componentType: Type<any>): void
    {
        this.nodeMap.set(nodeType, componentType);
    }
}