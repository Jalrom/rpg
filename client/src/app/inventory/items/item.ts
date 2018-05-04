import {ModelObject} from './modelObject';

export abstract class Item {
    // Properties
    private _identifier: number;
    private _name: string;
    private _value: number;
    private _description: string;
    private _modelObject: ModelObject;

    // Constructor
    constructor() {
        this.identifier = null;
        this.name = '';
        this.value = 0;
        this.description = 'No description';
        this._modelObject = new ModelObject();
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

    public get modelObject(): ModelObject {
        return this._modelObject;
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

    public set modelObject(value: ModelObject) {
        this._modelObject = value;
    }
}
