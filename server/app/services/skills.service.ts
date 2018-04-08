import { Skill } from './../models/skill.model';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { SkillsRepository } from "../repository/skills.repository";

@injectable()
export class SkillsService {
    @inject(TYPES.SkillsRepository)
    private skillRepository: SkillsRepository;

    // public async getSkillsOfPlayer(playerId: string): Promise<Array<Skill>> {
    //     return await this.skillRepository.findByPlayer(playerId);
    // }

    public async createSkill(skill: Skill): Promise<void> {
        this.skillRepository.create(skill);
    }

    public async updateSkill(skill: Skill): Promise<void> {

    }
}