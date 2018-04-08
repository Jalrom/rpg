import { inject } from 'inversify';
import * as express from 'express';
import { injectable } from 'inversify';
import { RegistrableController } from './registerable.controller';
import TYPES from "../types";
import { Player } from "../models/player.model";
import { RegisterService } from "../services/register.service";

@injectable()
export class RegisterController implements RegistrableController {
    @inject(TYPES.RegisterService) 
    private registerService: RegisterService;
    private route: string;
    constructor() {
        this.route = '/api/register';
    }

    public register(app: express.Application): void {
        app.route(this.route)
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const newPlayer: Player = new Player();
                newPlayer.username = req.body.username;
                newPlayer.name = req.body.name;
                newPlayer.email = req.body.email;
                newPlayer.password = req.body.password;
                await this.registerService.createUser(newPlayer) 
                    .then(user => {
                        newPlayer.id = user.id
                        res.json(newPlayer.id);
                    })
                    .catch(err => next(err));
                    
            })
    }
}