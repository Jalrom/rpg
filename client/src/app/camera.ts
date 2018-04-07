import * as THREE from 'three';

export class Camera {
    // Singleton Instance
    private static _instance: Camera;

    // Properties
    private _camera: THREE.PerspectiveCamera;

    // Constructor
    private constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 3;
        this.camera.position.y = 1;
    }

    // Getter and Setters
    public static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }

    public get camera() {
        return this._camera;
    }

    public set camera(value: THREE.PerspectiveCamera) {
        this._camera = value;
    }
}