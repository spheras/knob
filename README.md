# Knob Widget

Knob is an Angular component to set values with the typical Knob control (for instance, very used in music hardware).  The 
component is very basic, you just need to configure the range of values admited, and the degrees the knob can manage. This component doesn't suply any skin by itself but you can find some example skins here too: https://github.com/spheras/knob/tree/master/skins  

The following is an example of what you can achieve with this component:

![alt tag](https://raw.githubusercontent.com/spheras/knob/master/etc/knob5.gif)  
![alt tag](https://raw.githubusercontent.com/spheras/knob/master/etc/knob3.gif)
  
  
## Getting Started  

## Instaling the Component
First of all you'll need to add it to your project as a dependency, i.e. with npm:

`npm install ng2-knob --save`

## Using the Component
Using Knob widget is pretty simple. First, import the component inside the module of your Angular Application, like this:

```
import { KnobModule } from 'ng2-knob';
...
@NgModule({
 ...
   declarations: [
        AppComponent,
        ...
    ],
    imports: [
      BrowserModule,
      FormsModule,
      KnobModule,
      ...
 ...
})
export class AppModule {}
```
## Add Component to your Application
To start working with the new component, add it to the html part of the component you desire:

```
@Component({
    selector: 'my-app',
    template: `
  <h3>Knob Use Example</h3>
    <div class="container">
        <knob class="skin1" #myknob1 [min]="10" [max]="200" [value]="80" [startDegree]="200"  [endDegree]="120"></knob>
        <div class="info bpm">{{myknob1.meterValue}} bpm</div>
    </div>    
  `,
})
export class App {
    // ...
}
```
To use correctly the knob, you will need probably a container and a div (like info div in the example) to show the current value of the knob.  The container will have the base skin (which is static and don't rotate), and the info will show the meter value of the knob.  You can find some examples below.

## Input Parameters

\<knob \[**min**\]="0"  \[**max**\]="100"\ \[**value**\]="50"\ \[**startDegree**\]="0"\ \[**endDegree**\]="120"\> \</knob>

#### min (type: number)

- The minimum value you need for the range of values [min,max]

#### max (type: number)

- The maximum value you need for the range of values [min,max]

#### value (type: number)

- The starting value you want for the knob. Consider to put a value between min and max.

#### startDegree (type: number)

- The knob rotate from a start degree to an end degree. This is the **start** degree.


#### endDegree (type: number)

- The knob rotate from a start degree to an end degree. This is the **end** degree.

## Output Events

The component emit an event at every change value of the knob. You can listen to these events using the **change** property with the **$event** property received.

```
 <knob class="skin1" #myknob1 [min]="10" [max]="200" [value]="80" [startDegree]="200"  [endDegree]="120" (change)="console.log($event);"></knob>
```

## Run the example application locally
- `git clone https://github.com/spheras/knob.git`
- `cd knob`
- `npm install`
- `npm start` # Default Browser should open automatically on http://localhost:3000

## License

[MIT](https://tldrlegal.com/license/mit-license)

## Examples

![alt tag](https://raw.githubusercontent.com/spheras/knob/master/etc/knob1.gif)
![alt tag](https://raw.githubusercontent.com/spheras/knob/master/etc/knob2.gif)
![alt tag](https://raw.githubusercontent.com/spheras/knob/master/etc/knob3.gif)
![alt tag](https://raw.githubusercontent.com/spheras/knob/master/etc/knob4.gif)
![alt tag](https://raw.githubusercontent.com/spheras/knob/master/etc/knob5.gif)
