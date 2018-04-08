import { inject } from 'inversify';
import * as express from 'express';
import { injectable } from 'inversify';
import { RegistrableController } from './registerable.controller';
import TYPES from '../types';
import { SkillsService } from "../services/skills.service";
import { Skill } from "../models/skill.model";

@injectable()
export class SkillsController implements RegistrableController {
    @inject(TYPES.SkillsService) 
    private skillsService: SkillsService;
    private route: string;
    constructor() {
        this.route = '/api/skills';
    }

    public register(app: express.Application): void {
        app.route(this.route)
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {   
                console.log('in here');
                    
                const skill = new Skill();
                skill.player.id = 1;
                skill.name = 'mining';
                skill.level = 1;
                skill.experience = 0;              
                await this.skillsService.createSkill(skill).then(skills => res.json(skills)).catch(err => next(err));
            })
    }
}