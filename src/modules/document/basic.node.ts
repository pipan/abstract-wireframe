import { Node } from "./node.interface";
import { Subject, Observable } from "rxjs";

export class BasicNode implements Node
{
    protected children: Array<Node>;
    protected tags: Array<string>;
    protected emitters: Map<string, Subject<Node>>;
    protected observables: Map<string, Observable<Node>>;
    protected params: any;
    protected type: string;

    constructor(type: string)
    {
        this.type = type;
        this.children = [];
        this.tags = [];
        this.params = {};
        this.emitters = new Map();
        this.emitters.set("change", new Subject<Node>());

        this.observables = new Map();
        this.emitters.forEach((subject: Subject<Node>, key: string) => {
            this.observables.set(key, subject.asObservable());
        });
    }

    getType(): string
    {
        return this.type;
    }

    getName(): string
    {
        return this.getType();
    }

    getTags(): Array<string>
    {
        return this.tags;
    }

    on(eventName: string): Observable<Node>
    {
        return this.observables.get(eventName);
    }

    getParams(): any
    {
        return this.params;
    }
}