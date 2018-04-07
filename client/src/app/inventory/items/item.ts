import {GameObject} from './gameObject';

export abstract class Item extends GameObject {
    // Properties
    private _identifier: number;
    private _name: string;
    private _value: number;
    private _description: string;

    // Constructor
    constructor() {
        super();
        this.identifier = null;
        this.name = '';
        this.value = 0;
        this.description = 'No description';
    }

    // Getters and Setters
    public get identifier(): number {
        return this._identifier;
    }

    public get name(): string {
        return this._name;
    }

    public get value(): number {
        return this._value;
    }

    public get description(): string {
        return this._description;
    }

    public set identifier(value: number) {
        this._identifier = value;
    }

    public set name(value: string) {
        this._name = value;
    }

    public set value(value: number) {
        this._value = value;
    }

    public set description(value: string) {
        this._description = value;
    }
}
