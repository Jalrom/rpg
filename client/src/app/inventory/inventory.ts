import { Item } from './items/item';
import { Slot } from './slot';

export const NUM_SLOTS = 36;
export const NUM_ROWS = 6;
export const NUM_COLUMNS = 6;

export class Inventory {
    // Properties
    private _slots: Slot[][];
    private _items: Map<string, [number, number]>; // [quantity, index]
    private _firstEmptyIdx: number;

    // Constructor
    public constructor() {
        this.slots = [];
        this._items = new Map<string, [number, number]>();
        this._firstEmptyIdx = 0;

        for (let i = 0; i < NUM_ROWS; i++) {
            this.slots[i] = [];
            for (let j = 0; j < NUM_COLUMNS; j++) {
                this.slots[i][j] = new Slot();
            }
        }
    }

    // Methods
    public addItem(item: Item, quantity: number, index: number): void {
        let i;
        let j;
        if (index !== null) {
            i = Math.floor(index / NUM_COLUMNS);
            j = index % NUM_ROWS;
            this.slots[i][j].quantity = quantity;
            this.items.set(item.name, [quantity, index]);
        } else {
            i = Math.floor(this.firstEmptyIdx / NUM_COLUMNS);
            j = this.firstEmptyIdx % NUM_ROWS;
            this.slots[i][j].item = item.identifier;
            this.slots[i][j].quantity += quantity;
            this.slots[i][j].filled = true;
            this.items.set(item.name, [quantity, this.firstEmptyIdx]);
            this.firstEmptyIdx++;
        }
    }

    // Getters and Setters
    public get slots(): Slot[][] {
        return this._slots;
    }

    public set slots(value: Slot[][]) {
        this._slots = value;
    }

    public get items(): Map<string, [number, number]> {
        return this._items;
    }

    public set items(value: Map<string, [number, number]>) {
        this._items = value;
    }

    public get firstEmptyIdx(): number {
        return this._firstEmptyIdx;
    }

    public set firstEmptyIdx(value: number) {
        this._firstEmptyIdx = value;
    }

}
