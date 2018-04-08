import { Stats } from './../player-stats/stats';
import { Inventory } from '../inventory/inventory';
import { Item } from '../inventory/items/item';

export class Player {
    // Static Instance
    private static _instance: Player;

    // Properties
    private _username: string;
    private _stats: Stats;
    private _inventory: Inventory;

    // Constructor
    private constructor() {
        this.username = 'test';
        this.stats = new Stats();
        this.inventory = new Inventory();
    }

    // Getters and Setters
    public static get instance(): Player {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get inventory(): Inventory {
        return this._inventory;
    }

    public set inventory(value: Inventory) {
        this._inventory = value;
    }

    public get stats(): Stats {
        return this._stats;
    }

    public set stats(value: Stats) {
        this._stats = value;
    }

}
