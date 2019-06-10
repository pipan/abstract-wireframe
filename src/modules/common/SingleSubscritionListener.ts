import { Subscription } from "rxjs";
import { Listener } from "./Listener";
import { Listenable } from "./Listenable";

export class SingleSubscriptionListener<T> implements Listener<T>
{
    protected subscription: Subscription;
    protected listenable: Listenable<T>;
    protected binding: {eventName: string, callback: any};

    listenOn(listenable: Listenable<T>): void
    {
        this.listenable = listenable;
        if (this.binding) {
            this.listenFor(this.binding.eventName, this.binding.callback);
        }
    }

    listenFor(eventName: string, callBack: (changedValue: T) => void): void
    {
        if (this.listenable) {
            this.clear();
            this.subscription = this.listenable.on(eventName).subscribe((changedValue: T) => {
                callBack(changedValue);
            });
        }
        this.binding = {
            eventName: eventName,
            callback: callBack
        };
    }

    clear(): void
    {
        if (!this.subscription) {
            return;
        }
        this.subscription.unsubscribe();
        this.subscription = null;
        this.binding = null;
    }
}