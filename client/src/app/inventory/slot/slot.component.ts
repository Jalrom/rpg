import { Slot } from './../slot';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-slot',
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.scss']
})

export class SlotComponent implements OnInit {

    @Input() private slot: Slot;
    constructor() { }

    ngOnInit() {
    }

}
