import {Scene} from './scene';
import {Camera} from './camera';
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Renderer } from 'app/renderer';

@Injectable()
export class RaycasterService {
    // Properties
    private _mouse: THREE.Vector2;
    private _raycaster: THREE.Raycaster;
    private _renderer: THREE.WebGLRenderer;
    private _camera: THREE.PerspectiveCamera;
    private _scene: THREE.Scene;
    private _cursor: string;

    // Constructor
    public constructor() {
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this._renderer = Renderer.Instance.renderer;
        this._camera = Camera.Instance.camera;
        this._scene = Scene.Instance.scene;
        this._cursor = 'default';
    }

    // Methods
    public render(): THREE.Intersection[] {
        // Converts normalized coordinates to world coordinates
        this.raycaster.setFromCamera(this.mouse, this._camera);
        return this.raycaster.intersectObjects(this._scene.children);
    }

    public onMouseMove(event: MouseEvent): void {
        // Converts pixel coordinates to normalized coordinates (-1 to 1)
        const rectangle = this._renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rectangle.left) / rectangle.width) * 2 - 1;
        this.mouse.y = - ((event.clientY - rectangle.top) / rectangle.height) * 2 + 1;
    }

    // Getters and Setters
    public get mouse(): THREE.Vector2 {
        return this._mouse;
    }

    public set mouse(value: THREE.Vector2) {
        this._mouse = value;
    }

    public get raycaster(): THREE.Raycaster {
        return this._raycaster;
    }

    public set raycaster(value: THREE.Raycaster) {
        this._raycaster = value;
    }

    public get cursor(): string {
        return this._cursor;
    }

    public set cursor(value: string) {
        this._cursor = value;
    }

}
