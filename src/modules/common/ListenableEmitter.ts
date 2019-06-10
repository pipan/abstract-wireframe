import { Observable, Subject } from "rxjs";

export class ListenableEmitter<T>
{
    protected subjects: Map<string, Subject<T>>;
    protected observables: Map<string, Observable<T>>;

    constructor()
    {
        this.subjects = new Map();
        this.observables = new Map();
    }

    emit(eventName: string, value: T): void
    {
        if (!this.subjects.has(eventName)) {
            return;
        }
        this.subjects.get(eventName).next(value);
    }

    getObservable(eventName: string): Observable<T>
    {
        if (!this.observables.has(eventName)) {
            let subject: Subject<T> = new Subject();
            this.subjects.set(eventName, subject);
            this.observables.set(eventName, subject.asObservable());
        }
        return this.observables.get(eventName);
    }
}