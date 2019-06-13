import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, Type, Component, ComponentRef } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { DynamicInput } from "./DynamicInput";
import { DynamicCompoennt } from "./DynamicComponent";

@Injectable()
export class DynamicComponentResolver<T>
{
    protected subscripion: Subscription;
    protected viewContainerRef: ViewContainerRef;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected lastValue: T;
    protected components: Map<string, DynamicCompoennt>;

    constructor(componentFactoryResolver: ComponentFactoryResolver)
    {
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = null;
        this.subscripion = null;
        this.lastValue = null;
        this.components = new Map();
    }

    observe(observable: Observable<T>): DynamicComponentResolver<T>
    {
        if (this.subscripion != null) {
            this.subscripion.unsubscribe();
        }
        this.subscripion = observable.subscribe((value: T) => {
            this.lastValue = value;
            this.redraw(this.lastValue);
        });
        return this;
    }

    addComponent(className: string, component: DynamicCompoennt): DynamicComponentResolver<T>
    {
        this.components.set(className, component);
        return this;
    }

    drawTo(viewContainerRef: ViewContainerRef): void
    {
        if (this.viewContainerRef != null) {
            this.viewContainerRef.clear();
        }
        this.viewContainerRef = viewContainerRef;
        this.redraw(this.lastValue);
    }

    protected getDynamicComponent(value: T): DynamicCompoennt
    {
        return this.components.get(value.constructor.name);
    }

    protected redraw(value: T): void
    {
        if (this.viewContainerRef == null) {
            return;
        }

        this.viewContainerRef.clear();
        if (value == null) {
            return;
        }
        
        let ComponentFactory: ComponentFactory<Component> = this.componentFactoryResolver.resolveComponentFactory<Component>(this.getDynamicComponent(value).getComponent());
        let componentRef: ComponentRef<Component> = this.viewContainerRef.createComponent(ComponentFactory);
        this.getDynamicComponent(value).assign(value, componentRef.instance);
    }
}