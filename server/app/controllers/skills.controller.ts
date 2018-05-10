import { PlayerRepository } from './../repository/player.repository';
import { inject } from 'inversify';
import * as express from 'express';
import { injectable } from 'inversify';
import { RegistrableController } from './registerable.controller';
import TYPES from '../types';
import { SkillsService } from "../services/skills.service";
import { Skill } from "../models/skill";

@injectable()
export class SkillsController implements RegistrableController {
    @inject(TYPES.SkillsService) 
    private skillsService: SkillsService;

    @inject(TYPES.PlayerRepository)
    private playerRepository: PlayerRepository;
    private route: string;
    constructor() {
        this.route = '/api/skills';
    }

    public register(app: express.Application): void {
        app.route(this.route + '/:playerId')
            .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const skills = await this.skillsService.getSkillsOfPlayer(<string> req.params.playerId).catch(err => next(err));
                res.json(skills);
            })
        app.route(this.route)
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {   
                const skill = new Skill(
                    req.body.name,
                    req.body.level,
                    req.body.experience,
                    req.body.player
                );
                console.log(req.body);
                
                skill.player = await this.playerRepository.find(req.body.playerId);
                skill.name = 'mining';
                skill.level = 1;
                skill.experience = 0;              
                await this.skillsService.createSkill(skill).then(skills => res.json(skills)).catch(err => next(err));
            })
            .put(async(req: express.Request, res: express.Response, next: express.NextFunction) => {                
                const skill = new Skill(
                    req.body.name,
                    req.body.level,
                    req.body.experience,
                    req.body.player,
                    req.body.id
                );

                const updatedSkill = await this.skillsService.updateSkill(skill).catch(err => next(err));
                res.json(updatedSkill);
            });
    }
}