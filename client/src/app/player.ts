import { Inventory } from './inventory/inventory';
import { Item } from './inventory/items/item';

export const EXP_FACTOR = 3;
export class Player {

    // Static Instance
    private static _instance: Player;

    // Properties
    private _username: string;
    private _level: number;
    private _miningLevel: number;
    private _miningExperience: number;
    private _inventory: Inventory;

    // Constructor
    private constructor() {
        this.username = 'test';
        this.level = 1;
        this.miningLevel = 1;
        this.miningExperience = 0;
        this.inventory = new Inventory();
    }
    // Methods
    private convertSkillExperienceToLevel(experience: number): number {
        return Math.sqrt(experience) / EXP_FACTOR + 1;
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

    public get level(): number {
        return this._level;
    }

    public set level(value: number) {
        this._level = value;
    }

    public get miningLevel(): number {
        return this._miningLevel;
    }

    public set miningLevel(value: number) {
        this._miningLevel = value;
    }

    public get inventory(): Inventory {
        return this._inventory;
    }

    public set inventory(value: Inventory) {
        this._inventory = value;
    }

    public get miningExperience(): number {
        return this._miningExperience;
    }

    public set miningExperience(value: number) {
        this.miningLevel = this.convertSkillExperienceToLevel(value);
        console.log(this.miningLevel);
        this._miningExperience = value;
    }
}
