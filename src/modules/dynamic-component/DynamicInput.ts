import { Component } from "@angular/core";

export interface DynamicInput
{
    assign(value: any, to: any): void;
}