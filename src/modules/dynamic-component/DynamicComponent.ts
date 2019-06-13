import { DynamicInput } from "./DynamicInput";
import { Type } from "@angular/core";

export class DynamicComponent implements DynamicInput
{
    protected input: DynamicInput;
    protected component: Type<any>;

    constructor(compoennt: Type<any>, input: DynamicInput)
    {
        this.component = compoennt;
        this.input = input;
    }

    getComponent(): Type<any>
    {
        return this.component;
    }

    getInput(): DynamicInput
    {
        return this.input;
    }

    assign(value: any, to: any): void
    {
        this.getInput().assign(value, to);
    }
}