import { ObjectLoaderService } from './../../objectLoader.service';
import * as THREE from 'three';

export abstract class Item {
    // Properties
    private _identifier: number;
    private _name: string;
    private _value: number;
    private _color: THREE.Color;
    private _description: string;
    private _mesh: THREE.Mesh;

    // Constructor
    constructor() {
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

    public get color(): THREE.Color {
        return this._color;
    }

    public get description(): string {
        return this._description;
    }

    public get mesh(): THREE.Mesh {
        return this._mesh;
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

    public set color(value: THREE.Color) {
        this._color = value;
    }

    public set description(value: string) {
        this._description = value;
    }

    public set mesh(value: THREE.Mesh) {
        this._mesh = value;
    }
}
