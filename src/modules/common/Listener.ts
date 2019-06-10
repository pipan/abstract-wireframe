import { Listenable } from "./Listenable";

export interface Listener<T>
{
    listenOn(listenable: Listenable<T>): void;
    listenFor(eventName: string, callBack: any): void;
    clear(): void;
}