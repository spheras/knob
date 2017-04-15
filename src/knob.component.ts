import {
    Component, Input, Output, EventEmitter, ViewChild, ElementRef
} from '@angular/core';

@Component({
    template: `<div #knob class="knob">
    <div class="knob-tick"></div>
</div>
<div class="knob-value">{{meterValue}}{{unit}}</div>`,
    styles: [`.knob {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 3px solid black;
    cursor: pointer;
}

.knob .knob-tick {
    width: 2px;
    height: 35%;
    background: black;
    margin: 0 auto;
}`],
    selector: 'knob'
})

/**
 * @class
 * @name KnobComponent
 * @description a knob component based on https://github.com/joedotjs/ngKnob/blob/master/dist/ngKnob.js
 */
export class KnobComponent {
    /** the minimum possible value */
    @Input('min') min: number = 0;
    /** the maximum possible value */
    @Input('max') max: number = 0;
    /** the unit we are measuring */
    @Input('unit') unit: string = "cm";
    /** the real meter value */
    @Input('value') meterValue: number = 0;

    /** the start degree for the knob */
    @Input('startDegree') startDegree: number = 200;
    /** the end degree for the knob */
    @Input('endDegree') endDegree: number = 120;


    @ViewChild('knob') knobDiv: ElementRef;

    /** the current rotation persisted (not persisted until the touch/mouse down is released) */
    private meterRotation: number = 0;
    /** the temporal meter rotation we have until the touch/mousedown is released */
    private tmpMeterRotation: number = 0;
    private startX: number = 0;
    private startY: number = 0;
    //this is the max distance calculated to complete the 360º
    private maxDistance: number = 0;

    constructor() {
        this.maxDistance = document.body.clientHeight;
        if (document.body.clientWidth > this.maxDistance) {
            this.maxDistance = document.body.clientWidth;
        }
        this.maxDistance = (this.maxDistance * 20) / 100;
    }

    ngAfterViewInit() {
        var self = this;
        this.knobDiv.nativeElement.addEventListener('mousedown', function (e: any) { self.setChangeListener(e); });
        this.knobDiv.nativeElement.addEventListener('touchstart', function (e: any) { self.setChangeListener(e); });
        this.calculateInitialValue();
    }

    /**
     * @name getMouseDifference
     * @description get the mouse difference between the start down position and the current position
     * @param 
     */
    getMouseDifference(e: any) {
        var mousepos = this.getMousePosition(e);
        var yMovement = mousepos.clientY - this.startY;
        return yMovement;
    }

    /**
     * @name getMaxDegrees
     * @description obtain the max degrees available to move the knob
     */
    getMaxDegrees(): number {
        if (this.endDegree > this.startDegree) {
            return this.endDegree - this.startDegree;
        } else if (this.endDegree < this.startDegree) {
            return 360 + this.endDegree - this.startDegree;
        } else {
            return 0;
        }
    }

    /**
     * @name calculateInitialValue
     * @description calculate the initial rotation based on the value we have initially
     */
    private calculateInitialValue() {
        let norm: number = this.meterValue - this.min;
        let percent = norm * 100 / (this.max - this.min);
        let maxdeg = this.getMaxDegrees();
        let rot = percent * maxdeg / 100;
        this.meterRotation = rot % 360;
        rot = rot + this.startDegree;
        this.knobDiv.nativeElement.style.transform = "rotate(" + (rot) + "deg)";
    }

    /**
     * @name calculateChange
     * @description calculates the difference of the knob after a movement of the mouse/finger and render correctly the knob
     * @param {number} mousePositionChange the difference respect the original position when mousedown/touchstart events 
     */
    calculateChange(mousePositionChange: number) {
        var maxDegrees = this.getMaxDegrees();
        var newValue = mousePositionChange * maxDegrees / this.maxDistance;
        newValue = (newValue + this.meterRotation);

        if (newValue < 0) {
            newValue = 0;
        } else if (newValue > maxDegrees) {
            newValue = maxDegrees;
        }
        this.tmpMeterRotation = newValue;
        console.log(this.tmpMeterRotation);

        this.knobDiv.nativeElement.style.transform = "rotate(" + (newValue + this.startDegree) + "deg)";

        this.meterValue = (100 * newValue) / maxDegrees;
        var norm = this.max - this.min;
        this.meterValue = Math.round(((norm * this.meterValue) / 100) + this.min);
    }

    /**
     * @name getMousePosition
     * @description return the mouse position based en an touch or mouse event
     */
    getMousePosition(event: any): any {
        var result = { clientX: 0, clientY: 0 };
        if (event.touches) {
            result.clientX = event.touches[0].clientX;
            result.clientY = event.touches[0].clientY;
        } else {
            result.clientX = event.clientX;
            result.clientY = event.clientY;
        }
        return result;
    }

    /**
     * @name setChangeListener
     * @description after set the mousedown event, we start listenng the move event
     * @param {MouseEvent or TouchEvent} e event
     */
    setChangeListener(e: any) {
        var self = this;
        var mousepos = this.getMousePosition(e);
        this.startX = mousepos.clientX;
        this.startY = mousepos.clientY;
        var funcMove = function (e: any) {
            var change = self.getMouseDifference(e);
            self.calculateChange(change);
        }
        var funcRemove = function (e: any) {
            self.startX = 0;
            self.startY = 0;
            self.meterRotation = self.tmpMeterRotation;
            document.removeEventListener('mousemove', funcMove);
            document.removeEventListener('touchmove', funcMove);
            document.removeEventListener('mouseup', funcRemove);
            document.removeEventListener('touchend', funcRemove);
        }

        document.addEventListener('mousemove', funcMove, false);
        document.addEventListener('touchmove', funcMove, false);
        document.addEventListener('mouseup', funcRemove, false);
        document.addEventListener('touchend', funcRemove, false);
    }

}
