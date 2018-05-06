import { JSONLoaderService, MINERAL_MODEL } from './../jsonLoader.service';
import { Item } from '../inventory/items/item';
import { Visitor } from './../visitors/visitor';
import * as THREE from 'three';

export abstract class Mineral extends Item {
    // Properties
    private _levelRequired: number;
    private _experienceGained: number;
    private _dropCount: number;

    // Constructor
    public constructor(protected jsonLoaderService: JSONLoaderService) {
        super();
        this.levelRequired = 0;
        this.experienceGained = 0;
        this.dropCount = 0;
        this.mesh = this.jsonLoaderService.getModel(MINERAL_MODEL);
        this.mesh.geometry.name = 'mineral';
    }

    // Methods
    public accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    // Getters and Setters
    public get levelRequired(): number {
        return this._levelRequired;
    }

    public set levelRequired(levelRequired: number) {
        this._levelRequired = levelRequired;
    }

    public get experienceGained(): number {
        return this._experienceGained;
    }

    public set experienceGained(experienceGained: number) {
        this._experienceGained = experienceGained;
    }

    public get dropCount(): number {
        return this._dropCount;
    }

    public set dropCount(dropCount: number) {
        this._dropCount = dropCount;
    }
}
