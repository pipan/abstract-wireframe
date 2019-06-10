import { ComponentFactory, Injectable, ComponentFactoryResolver, Type } from "@angular/core";

@Injectable()
export class StringComponentResolver
{
    protected map: Map<string, Type<any>>;

    constructor(
        protected componentFactoryResolver: ComponentFactoryResolver
    )
    {
        this.map = new Map();
    }

    resolve<T>(name: string): ComponentFactory<T>
    {
        let classType: Type<any> = this.map.get(name);
        return this.componentFactoryResolver.resolveComponentFactory<T>(classType);
    }

    bind(name: string, type: Type<any>): void
    {
        this.map.set(name, type);
    }
}