import * as THREE from 'three';

export class Renderer {

    // Singleton Instance
    private static _instance: Renderer;

    // Properties
    private _renderer: THREE.WebGLRenderer;

    // Constructor
    private constructor() {
        this._renderer = new THREE.WebGLRenderer({ antialias: true, devicePixelRatio: window.devicePixelRatio });
    }

    // Getter and Setters
    public static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }

    public get renderer() {
        return this._renderer;
    }

    public set renderer(value: THREE.WebGLRenderer) {
        this._renderer = value;
    }
}
