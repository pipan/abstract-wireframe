import { Listenable } from "./Listenable";
import { Observable } from "rxjs";

export interface Tree<T>
{
    getParent(): Tree<T>;
    removeChildAt(index: number): void;
    removeChild(item: Tree<T>): void;
    appendChild(item: T): void;
    prependChild(item: T): void;
    insertChildAt(item: T, position: number): void;
    getChildren(): Array<Tree<T>>;
    getChildAt(index: number): Tree<T>;
    get(): T;
    set(value: T): void;
    on(eventName: string): Observable<Tree<T>>;
}