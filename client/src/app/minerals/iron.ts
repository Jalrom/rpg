import { JSONLoaderService } from './../jsonLoader.service';
import { Mineral } from 'app/minerals/mineral';
import * as THREE from 'three';

export class Iron extends Mineral {
    public constructor(protected jsonLoaderService: JSONLoaderService) {
        super(jsonLoaderService);
        this.name = 'iron';
        this.mesh.name = 'iron';
        this.color = new THREE.Color(0xE6E7E8);
        (this.mesh as any).material = (this.mesh as any).material.clone(true);
        (this.mesh.material as THREE.MeshPhongMaterial).color = this.color;
        this.experienceGained = 20;
        this.levelRequired = 10;
        this.dropCount = Math.ceil(Math.random() * 3 + 1);
    }
}
