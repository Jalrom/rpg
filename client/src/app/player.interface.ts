import { Skill } from './skill';

export interface IPlayer {
    id?: number;
    username: string;
    name: string;
    email: string;
    password: string;
    skills: Skill[];
}
