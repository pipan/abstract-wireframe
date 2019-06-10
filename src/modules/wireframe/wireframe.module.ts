import { NgModule } from '@angular/core';

import { WireframeComponent } from './wireframe.component';
import { WireframeDirective } from './wireframe.directive';
import { DocumentModule } from '../document';
import { WireframeRenderer } from './wireframe-renderer.service';

@NgModule({
    imports: [DocumentModule],
    exports: [WireframeComponent, WireframeDirective],
    declarations: [WireframeComponent, WireframeDirective],
    providers: [WireframeRenderer],
    entryComponents: [WireframeComponent]
})
export class WireframeModule { }
