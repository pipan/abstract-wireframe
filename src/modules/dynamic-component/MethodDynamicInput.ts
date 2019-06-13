import { DynamicInput } from "./DynamicInput";

export class MethodDynamicInput implements DynamicInput
{
    protected methodName: string;

    constructor(methodName: string)
    {
        this.methodName = methodName;
    }

    assign(value: any, to: any): void
    {
        to[this.methodName](value);
    }
}