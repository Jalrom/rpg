import {Player} from '../player';
import { RaycasterService } from '../raycaster.service';
import { Visitor } from 'app/visitors/visitor';
import { Mineral } from 'app/minerals/mineral';
import * as THREE from 'three';

export const POINTER_DISABLED = 'pointer_disabled.cur';
export const POINTER = 'pointer.cur';
export const DEFAULT_CURSOR = 'default';
export class HoverRessourceVisitor implements Visitor {
    // Properties
    private _minerals: Mineral[];

    // Constructor
    public constructor(private raycasterService: RaycasterService, minerals: Mineral[]) {
        this._minerals = minerals;
    }

    // Methods
    visit(mineral: Mineral): Object {
        const intersection = this.raycasterService.render();
        if (intersection.length > 0 && (intersection[0].object as THREE.Mesh).geometry.name === 'mineral') {
            if (intersection[0].object.name === mineral.mesh.name) {
                if (mineral.levelRequired <= Player.instance.miningLevel) {
                    mineral.material.color = new THREE.Color(0x0000ff);
                    this.raycasterService.cursor = POINTER;
                } else {
                    mineral.material.color = new THREE.Color(0xff0000);
                    this.raycasterService.cursor = POINTER_DISABLED;
                }
                return true;
            } else {
                mineral.material.color = mineral.color;
            }
        } else {
            this.raycasterService.cursor = DEFAULT_CURSOR;
        }
        return false;
    }
}
