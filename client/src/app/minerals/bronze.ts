import { ObjectLoaderService } from './../jsonLoader.service';
import { Mineral } from 'app/minerals/mineral';
import * as THREE from 'three';

export class Bronze extends Mineral {
    public constructor(protected jsonLoaderService: ObjectLoaderService) {
        super(jsonLoaderService);
        this.name = 'bronze';
        this.mesh.name = 'bronze';
        this.color = new THREE.Color(0xCD7F32);
        (this.mesh as any).material = (this.mesh as any).material.clone(true);
        (this.mesh.material as THREE.MeshPhongMaterial).color = this.color;
        this.experienceGained = 10;
        this.dropCount = Math.ceil(Math.random() * 3 + 1);
    }
}
