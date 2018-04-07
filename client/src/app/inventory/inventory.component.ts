import { Slot } from './slot';
import { Component, OnInit } from '@angular/core';
import { Inventory } from 'app/inventory/inventory';
import { Player } from '../player/player';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
    private inventoryOpen: boolean;
    private inventory: Inventory;
    private slots: Slot[][];

    public constructor() {
        this.inventoryOpen = false;
        this.inventory = Player.instance.inventory;
        this.slots = this.inventory.slots;
    }

    public ngOnInit(): void {
    }

    public openInventory(event: MouseEvent): void {
        this.inventoryOpen = true;
    }

    public closeInventory(event: MouseEvent) {
        this.inventoryOpen = false;
    }

    public onMouseMove(event: MouseEvent) {
        event.stopPropagation();
    }
}
