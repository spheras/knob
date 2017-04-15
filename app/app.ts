import { Component, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { KnobModule } from '../index';

@Component({
    selector: 'my-app',
    template: `
  <h3>Angular 2 Knob Component</h3>
    <div>
    <knob [min]="10" [max]="200" [unit]="' bpm'" [value]="80"></knob>
    </div>
  `,
})
export class AppComponent {

}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        KnobModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
