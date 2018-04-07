import { Player } from '../player/player';
import { Mineral } from 'app/minerals/mineral';
import { Visitor } from './visitor';

export class CollectRessourceVisitor implements Visitor {
    // Properties
    private _minerals: Mineral[];
    private _mineralIndex: number;
    private _scene: THREE.Scene;
    private _player: Player;

    // Constructor
    public constructor(minerals: Mineral[], mineralIndex: number, scene: THREE.Scene) {
        this._minerals = minerals;
        this._mineralIndex = mineralIndex;
        this._scene = scene;
        this._player = Player.instance;
    }

    public visit(mineral: Mineral): Object {
        if (mineral === null) {
            return null;
        }
        if (mineral.levelRequired <= this._player.miningLevel) {
            // TODO: Experience instead of a level
            this._player.miningExperience += mineral.experienceGained;
            this.deleteMineral(mineral);
            const item = this._player.inventory.items.get(mineral.name);
            if (item !== undefined) {
                const quantity = item[0] + mineral.dropCount;
                const index = item[1];
                this._player.inventory.addItem(mineral, quantity, index);
            } else {
                this._player.inventory.addItem(mineral, mineral.dropCount, null);
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
        this._scene.remove(mineral.mesh);
        mineral.geometry.dispose();
        mineral.material.dispose();
    }
}
