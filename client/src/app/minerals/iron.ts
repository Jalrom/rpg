import { Mineral } from 'app/minerals/mineral';
import * as THREE from 'three';

export class Iron extends Mineral {
    public constructor() {
        super();
        this.name = 'iron';
        this.mesh.name = 'iron';
        this.color = new THREE.Color(0xE6E7E8);
        this.material.color = this.color;
        this.experienceGained = 20;
        this.levelRequired = 10;
        this.dropCount = Math.ceil(Math.random() * 3 + 1);
    }
}
