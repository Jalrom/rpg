export const EXP_FACTOR = 5;

export class Stats {
    // Properties
    private _level: number;
    private _experience: number;
    private _miningLevel: number;
    private _miningExperience: number;

    // Constructor
    public constructor() {
        this.level = 1;
        this.experience = 0;
        this.miningExperience = 0;
        this.miningLevel = this.convertSkillExperienceToLevel(this.miningExperience);
    }

    // Methods
    private convertSkillExperienceToLevel(experience: number): number {
        return Math.floor(Math.sqrt(experience) / EXP_FACTOR + 1);
    }
    // Getters and Setters
    public get level(): number {
        return this._level;
    }

    public get experience(): number {
        return this._experience;
    }

    public get miningLevel(): number {
        return this._miningLevel;
    }

    public get miningExperience(): number {
        return this._miningExperience;
    }

    public set level(value: number) {
        this._level = value;
    }

    public set experience(value: number) {
        this._experience = value;
    }

    public set miningLevel(value: number) {
        this._miningLevel = value;
    }

    public set miningExperience(value: number) {
        this.miningLevel = this.convertSkillExperienceToLevel(value);
        this._miningExperience = value;
    }
}

