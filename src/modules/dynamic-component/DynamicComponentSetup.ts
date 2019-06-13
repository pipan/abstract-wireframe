import { DynamicComponentResolver } from "./DynamicComponentResolver";
import { Injectable, ComponentFactoryResolver } from "@angular/core";

@Injectable()
export class DynamicComponentSetup
{
    protected resolvers: Map<string, DynamicComponentResolver<any>>;

    constructor(protected componentFactoryResolver: ComponentFactoryResolver)
    {
        this.resolvers = new Map();
    }

    setup<T>(name: string): DynamicComponentResolver<T>
    {
        if (!this.resolvers.has(name)) {
            this.resolvers.set(name, new DynamicComponentResolver<T>(this.componentFactoryResolver));
        }
        return this.resolvers.get(name);
    }
}