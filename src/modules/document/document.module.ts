import { NgModule } from '@angular/core';
import { NodeComponentResolver } from './node-component-resolver.service';
import { CommonModule } from '../common';
import { NodeFactory } from './node.factory';

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [],
    providers: [NodeComponentResolver, NodeFactory],
})
export class DocumentModule { }
