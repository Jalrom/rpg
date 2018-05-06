import { Injectable } from '@angular/core';
import * as THREE from 'three';

export const MINERAL_MODEL = 'mineral.json';
export const MOUNTAIN_MODEL = 'mountain1.json';

@Injectable()
export class ObjectLoaderService {
    private objectLoader: THREE.ObjectLoader;
    private loadedModels: [string, THREE.Mesh] [];

    public constructor() {
        this.objectLoader = new THREE.ObjectLoader();
        this.loadedModels = [];
    }

    public async loadModels(): Promise<void> {
        await Promise.all(
            [
                this.loadModel(MINERAL_MODEL),
                this.loadModel(MOUNTAIN_MODEL)
            ]
        );
    }

    public loadModel(modelPath: string): Promise<THREE.Mesh> {
        return new Promise<THREE.Mesh>((resolve, error) => {
            this.objectLoader.load('/assets/models/' + modelPath , (object3d) => {
                console.log(object3d.children[0]);
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
