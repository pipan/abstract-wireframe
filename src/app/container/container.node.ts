import { BasicNode } from "src/modules/document";

export class ContainerNode extends BasicNode
{
    protected name: string;
    constructor()
    {
        super("container");
        this.name = "";
        this.params.flexDirection = "column";
    }

    getName(): string
    {
        if (this.name.length == 0) {
            return this.getType() + " " + this.getParams().flexDirection;
        }
        return this.name;
    }

    setFlexDirection(direction: string): void
    {
        this.params.flexDirection = direction;
        this.emitters.get("change").next(this);
    }

    rename(name: string): void
    {
        this.name = name;
        this.emitters.get("change").next(this);
    }
}