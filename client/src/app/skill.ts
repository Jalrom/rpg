export class Skill {

    // Properties
    private _id: number;
    private _name: string;
    private _level: number;
    private _experience: number;
    private _nextLevelExperience: number;

    // Constructor
    // public constructor(id: number, name: string, level: number, experience: number, nextLevelExperience: number) {
    //     this._id = id;
    //     this._name = name;
    //     this._level = level;
    //     this._experience = experience;
    //     this._nextLevelExperience = nextLevelExperience;
    // }

    // Methods
    public convertExpToLevel(experience: number) {
        return Math.floor(Math.sqrt(experience) / 5 + 1);
    }

    public calculateNextLevelExperience(level: number): number {
        return Math.pow(level * 5, 2);
    }

    // Getters and Setters
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

    public get nextLevelExperience(): number {
        return this._nextLevelExperience;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set name(value: string) {
        this._name = value;
    }

    public set level(value: number) {
        this._level = value;
        this.calculateNextLevelExperience(this.level);
    }

    public set experience(value: number) {
        this._experience = value;
        this.level = this.convertExpToLevel(this.experience);
    }

    public set nextLevelExperience(value: number) {
        this._nextLevelExperience = value;
    }

}
