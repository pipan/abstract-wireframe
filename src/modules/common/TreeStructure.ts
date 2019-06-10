import { Tree } from "./tree";
import { Observable } from "rxjs";
import { ListenableEmitter } from "./ListenableEmitter";

export class TreeStructure<T> implements Tree<T>
{
    protected parent: Tree<T>;
    protected value: T;
    protected children: Array<Tree<T>>;
    protected emitter: ListenableEmitter<Tree<T>>;

    constructor(value: T, parent: Tree<T> = null)
    {
        this.value = value;
        this.parent = parent;
        this.children = [];
        this.emitter = new ListenableEmitter();
    }

    getParent(): Tree<T>
    {
        return this.parent;
    }

    get(): T
    {
        return this.value;
    }

    set(value: T): void
    {
        this.value = value;
        this.change();
    }

    protected create(item: T): Tree<T>
    {
        return new TreeStructure<T>(item, this);
    }

    appendChild(item: T): void
    {
        this.children.push(this.create(item));
        this.change();
    }

    prependChild(item: T): void
    {
        return this.insertChildAt(item, 0);
    }

    insertChildAt(item: T, position: number): void
    {
        this.children.splice(position, 0, this.create(item));
        this.change();
    }

    getChildAt(index: number): Tree<T>
    {
        if (this.children.length <= index) {
            return null;
        }
        return this.children[index];
    }

    getChildren(): Array<Tree<T>>
    {
        return this.children;
    }

    removeChildAt(index: number): void
    {
        this.children.splice(index, 1);
        this.change();
    }

    removeChild(item: Tree<T>): void
    {
        let index = this.children.indexOf(item);
        if (index == -1) {
            return;
        }
        this.removeChildAt(index);
    }

    protected change(): void
    {
        this.emitter.emit("change", this);
    }

    on(eventName: string): Observable<Tree<T>>
    {
        return this.emitter.getObservable(eventName);
    }
}