import { BasicNode } from "src/modules/document";

export class ContainerNode extends BasicNode
{
    constructor()
    {
        super("container");
        this.params.flexDirection = "column";
    }

    getName(): string
    {
        return this.getType() + " " + this.getParams().flexDirection;
    }

    setFlexDirection(direction: string): void
    {
        this.params.flexDirection = direction;
        this.emitters.get("change").next(this);
    }
}