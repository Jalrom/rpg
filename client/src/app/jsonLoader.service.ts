import { Injectable } from '@angular/core';
import * as THREE from 'three';

export const MINERAL_MODEL = 'mineral.json';

@Injectable()
export class JSONLoaderService {
    private jsonLoader: THREE.ObjectLoader;
    private loadedModels: [string, THREE.Mesh] [];

    public constructor() {
        this.jsonLoader = new THREE.ObjectLoader();
        this.loadedModels = [];
    }

    public async loadModels() {
        this.loadModel(MINERAL_MODEL);
    }

    public loadModel(modelPath: string): Promise<THREE.Mesh> {
        return new Promise<THREE.Mesh>((resolve, error) => {
            this.jsonLoader.load('/assets/models/' + modelPath , (object3d) => {
                this.loadedModels.push([modelPath, object3d.children[0] as THREE.Mesh]);
                resolve(object3d.children[0] as THREE.Mesh);
            });
        });
    }

    private copyModel(path: string): THREE.Mesh {
        for (let i = 0; i < this.loadedModels.length; i++) {
            if (this.loadedModels[i][0] === path) {
                return this.loadedModels[i][1].clone(true);
            }
        }
    }

    public getModel(modelPath: string): THREE.Mesh {
        return this.copyModel(modelPath);
    }
}
