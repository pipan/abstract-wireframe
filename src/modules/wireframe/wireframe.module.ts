import { NgModule } from '@angular/core';

import { WireframeComponent } from './wireframe.component';
import { WireframeDirective } from './wireframe.directive';
import { DocumentModule } from '../document';
import { WireframeRenderer } from './wireframe-renderer.service';
import { WireframeEditorComponent } from './editor/wireframe-editor.component';
import { WireframeEditorDirective } from './editor/wireframe-editor.directive';

@NgModule({
    imports: [DocumentModule],
    exports: [WireframeComponent, WireframeDirective, WireframeEditorComponent, WireframeEditorDirective],
    declarations: [WireframeComponent, WireframeDirective, WireframeEditorComponent, WireframeEditorDirective],
    providers: [WireframeRenderer],
    entryComponents: [WireframeComponent]
})
export class WireframeModule { }
