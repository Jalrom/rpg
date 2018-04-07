import { Mineral } from 'app/minerals/mineral';
import * as THREE from 'three';

export class Bronze extends Mineral {
    public constructor() {
        super();
        this.name = 'bronze';
        this.color = new THREE.Color(0xCD7F32);
        this.material.color = this.color;
        this.experienceGained = 10;
        this.dropCount = Math.ceil(Math.random() * 3 + 1);
    }
}
