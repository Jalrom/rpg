import { Skill } from './../skill';
import { PlayerGlobal } from '../player.global';
import { Mineral } from 'app/minerals/mineral';
import { Visitor } from './visitor';

export class CollectRessourceVisitor implements Visitor {
    // Properties
    private _minerals: Mineral[];
    private _mineralIndex: number;
    private _scene: THREE.Scene;

    // Constructor
    public constructor(private player: PlayerGlobal, minerals: Mineral[], mineralIndex: number, scene: THREE.Scene) {
        this._minerals = minerals;
        this._mineralIndex = mineralIndex;
        this._scene = scene;
    }

    public visit(mineral: Mineral): Object {
        if (mineral === null) {
            return null;
        }

        const miningSkill: Skill = this.player.skills.filter((skill) => { return skill.name === 'mining'; })[0];
        if (mineral.levelRequired <= miningSkill.level) {
            miningSkill.experience = mineral.experienceGained + miningSkill.experience;
            this.deleteMineral(mineral);
            const item = this.player.inventory.items.get(mineral.name);
            if (item !== undefined) {
                const quantity = item[0] + mineral.dropCount;
                const index = item[1];
                this.player.inventory.addItem(mineral, quantity, index);
            } else {
                this.player.inventory.addItem(mineral, mineral.dropCount, null);
            }
        } else {
            // TODO: indicate level too low visualy
            console.log('Mining level ' + mineral.levelRequired + ' required to collect ' + mineral.name + '!');
        }
        return null;
    }

    // TODO: exploit polymorphism
    private deleteMineral(mineral: Mineral): void {
        this._minerals.splice(this._mineralIndex, 1);
        this._scene.remove(mineral.modelObject.mesh);
        mineral.modelObject.geometry.dispose();
        mineral.modelObject.material.dispose();
    }
}
