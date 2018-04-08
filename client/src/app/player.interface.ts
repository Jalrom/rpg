import { ISkill } from './skill.interface';

export interface IPlayer {
    username: string;
    name: string;
    email: string;
    password: string;
    skills: ISkill[];
}
