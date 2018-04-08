import { ISkill } from './skill.interface';

export interface IPlayer {
    id?: number;
    username: string;
    name: string;
    email: string;
    password: string;
    skills: ISkill[];
}
