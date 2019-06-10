import { NgModule } from '@angular/core';
import { ToggleDirective } from './toggle.directive';
import { StringComponentResolver } from './string-component-resolver.service';


@NgModule({
    imports: [],
    exports: [ToggleDirective],
    declarations: [ToggleDirective],
    providers: [StringComponentResolver],
})
export class CommonModule { }
