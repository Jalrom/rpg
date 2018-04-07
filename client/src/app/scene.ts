import { OnInit } from '@angular/core';
import * as THREE from 'three';

export class Scene {
    // Singleton Instance
    private static _instance: Scene;

    // Properties
    private _scene: THREE.Scene;
    private _ambientLight: THREE.AmbientLight;
    private _pointLight: THREE.PointLight;

    // Constructor
    private constructor() {
        this.scene = new THREE.Scene();
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.pointLight = new THREE.PointLight(0xffffff, 2.0);
        this.pointLight.position.z = 0;
        this.pointLight.position.y = 5;
        this.init();
    }

    public init(): void {
        this.scene.add(this.ambientLight);
        this.scene.add(this.pointLight);
    }

    // Getters and Setters
    public static get Instance(): Scene {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }

    public get scene(): THREE.Scene {
        return this._scene;
    }

    public set scene(value: THREE.Scene) {
        this._scene = value;
    }

    public get ambientLight(): THREE.AmbientLight {
        return this._ambientLight;
    }

    public set ambientLight(value: THREE.AmbientLight) {
        this._ambientLight = value;
    }

    public get pointLight(): THREE.PointLight {
        return this._pointLight;
    }

    public set pointLight(value: THREE.PointLight) {
        this._pointLight = value;
    }
}
