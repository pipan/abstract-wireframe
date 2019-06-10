import { Listenable } from "../common";

export interface Node extends Listenable<Node>
{
    getType(): string;
    getName(): string;
    getTags(): Array<string>;
    getParams(): any;
}