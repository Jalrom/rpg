import * as THREE from 'three';

export class ModelObject extends THREE.Object3D {
    private _color: THREE.Color;
    private _geometry: THREE.Geometry;
    private _material: THREE.MeshPhongMaterial;
    private _mesh: THREE.Mesh;

    public constructor() {
        super();
        this.color = new THREE.Color(0xffffff);
        this.geometry = new THREE.SphereGeometry(0.1, 5, 5);
        this.material = new THREE.MeshPhongMaterial({color: this.color, wireframe: false, depthTest: true});
        this.mesh = new THREE.Mesh( this.geometry, this.material );
    }

    public get color(): THREE.Color {
        return this._color;
    }

    public get geometry(): THREE.Geometry {
        return this._geometry;
    }

    public get material(): THREE.MeshPhongMaterial {
        return this._material;
    }

    public get mesh(): THREE.Mesh {
        return this._mesh;
    }

    public set color(value: THREE.Color) {
        this._color = value;
    }

    public set geometry(value: THREE.Geometry) {
        this._geometry = value;
    }

    public set material(value: THREE.MeshPhongMaterial) {
        this._material = value;
    }

    public set mesh(value: THREE.Mesh) {
        this._mesh = value;
    }
}
