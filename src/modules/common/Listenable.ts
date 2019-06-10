import { Observable } from "rxjs";

export interface Listenable<T>
{
    on(eventName: string): Observable<T>
}