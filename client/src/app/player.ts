export class Player {

    // Properties
    private _username: string;
    private _password: string;
    private _email: string;
    private _name: string;

    // Constructor
    public constructor() {
        this._username = '';
        this._password = '';
        this._email = '';
        this._name = '';
    }

    // Getters and Setters
    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }
}
