import { Mineral } from 'app/minerals/mineral';
import * as THREE from 'three';

export class Bronze extends Mineral {
    public constructor() {
        super();
        this.name = 'bronze';
        this.modelObject.color = new THREE.Color(0xCD7F32);
        this.modelObject.material.color = this.modelObject.color;
        this.experienceGained = 10;
        this.dropCount = Math.ceil(Math.random() * 3 + 1);
    }
}
