import { BasicNode } from "src/modules/document";

export class ButtonNode extends BasicNode
{
    constructor()
    {
        console.log("BUTTON");
        super("button");
        console.log(this);
    }

    setAlignment(alignment: string): void
    {
        this.params.alignItems = alignment;
        this.emitters.get("change").next(this);
    }
}