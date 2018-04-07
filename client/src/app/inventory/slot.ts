import { Item } from './items/item';

export class Slot {
    // Properties
    private _filled: boolean;
    private _item: Item;
    private _quantity: number;

    // Constructor
    public constructor() {
        this.filled = false;
        this.item = null;
        this.quantity = 0;
    }

    // Getters and Setters
    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(value: number) {
        this._quantity = value;
    }

    public get filled(): boolean {
        return this._filled;
    }

    public set filled(value: boolean) {
        this._filled = value;
    }

    public get item(): Item {
        return this._item;
    }

    public set item(value: Item) {
        this._item = value;
    }
}
