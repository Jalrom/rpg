import { Mineral } from 'app/minerals/mineral';
import * as THREE from 'three';

export class Gold extends Mineral {
    public constructor() {
        super();
        this.name = 'gold';
        this.color = new THREE.Color(0xFFD700);
        this.material.color = this.color;
        this.experienceGained = 30;
        this.levelRequired = 20;
        this.dropCount = Math.ceil(Math.random() * 3 + 1);
    }
}