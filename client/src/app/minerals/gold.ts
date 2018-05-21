import { ObjectLoaderService } from './../objectLoader.service';
import { Mineral } from 'app/minerals/mineral';
import * as THREE from 'three';

export class Gold extends Mineral {
    public constructor(protected jsonLoaderService: ObjectLoaderService) {
        super(jsonLoaderService);
        this.name = 'gold';
        this.mesh.name = 'gold';
        this.color = new THREE.Color(0xFFD700);
        (this.mesh as any).material = (this.mesh as any).material.clone(true);
        (this.mesh.material as THREE.MeshPhongMaterial).color = this.color;
        this.experienceGained = 30;
        this.levelRequired = 20;
        this.dropCount = Math.ceil(Math.random() * 3 + 1);
    }
}
