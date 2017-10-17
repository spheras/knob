import { NgModule } from '@angular/core';
import { KnobComponent } from './knob.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [ FormsModule ],
    declarations: [ KnobComponent ],
    exports: [ KnobComponent ],
})
export class KnobModule {}
