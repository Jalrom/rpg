import { SkillDTO } from './../models/skill.model';
import { Skill } from './../models/skill';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { SkillsRepository } from "../repository/skills.repository";

@injectable()
export class SkillsService {
    @inject(TYPES.SkillsRepository)
    private skillRepository: SkillsRepository;

    public async getSkillsOfPlayer(playerId: string): Promise<Array<Skill>> {        
        const skillsDTO = await this.skillRepository.findByPlayer(playerId);
        const skills = [];
        for (let i = 0; i < skillsDTO.length; i++) {
            skills.push(this.toSkill(skillsDTO[i]));
        }
        return skills;
    }

    public async createSkill(skill: Skill): Promise<void> {
        const skillDTO = this.toSkillDTO(skill);
        await this.skillRepository.create(skillDTO);
    }

    public async updateSkill(skill: Object): Promise<void> {        
        // const skillDTO = this.toSkillDTO(skill);
        await this.skillRepository.update(skill);
    }

    private toSkillDTO(skill: Skill): SkillDTO {
        return {
            name: skill.name,
            experience: skill.experience,
            level: skill.level,
            player: skill.player,
            id: skill.id
        };
    }

    private toSkill(skillDTO: SkillDTO): Skill {
        return new Skill(
            skillDTO.name,
            skillDTO.level,
            skillDTO.experience,
            skillDTO.player,
            skillDTO.id);
    }
}