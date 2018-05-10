import { Player } from './player.model';

export class Skill {
    private _id?: number;
    private _name: string;
    private _level: number;
    private _experience: number;
    private _player: Player;

    public constructor(name: string, level: number, experience: number, player: Player, id?: number) {
        this._name = name;
        this._level = level;
        this._experience = experience;
        this._id = id;
        this._player = player;
    }
    public get id(): number {
        return this._id;
    }

	public get name(): string {
		return this._name;
	}

	public get level(): number {
		return this._level;
	}

	public get experience(): number {
		return this._experience;
	}

	public get player(): Player {
		return this._player;
	}

    public set id (value: number) {
        this._id = value;
    }

	public set name(value: string) {
		this._name = value;
	}

	public set level(value: number) {
		this._level = value;
	}

	public set experience(value: number) {
		this._experience = value;
	}

    public set player(value: Player) {
        this.player = value;
    }
    
}