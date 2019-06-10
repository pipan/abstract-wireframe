import { Injectable } from "@angular/core";
import { Listenable, ListenableEmitter, SingleSubscriptionListener } from "../common";
import { Observable } from "rxjs";
import { Node } from "./node.interface";

@Injectable()
export class DocumentService implements Listenable<Node>
{
    protected emitter: ListenableEmitter<Node>;
    protected selected: Node;

    constructor()
    {
        this.emitter = new ListenableEmitter();
    }

    select(node: Node): void
    {
        let changed: boolean = node != this.selected;
        this.selected = node;
        if (changed) {
            this.emitter.emit("select", this.selected);
        }
    }

    on(eventName: string): Observable<Node>
    {
        return this.emitter.getObservable(eventName);
    }
}