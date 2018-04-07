import { inject } from 'inversify';
import * as express from 'express';
import {injectable} from 'inversify';
import { RegistrableController } from './RegisterableController';
import TYPES from "../types";
import { User } from "../models/user";
import { RegisterService } from "../services/registerService";

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
                const newUser: User = new User();
                newUser.username = req.body.username;
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                newUser.password = req.body.password;
                await this.registerService.createUser(newUser) 
                    .then(user => {
                        newUser.id = user.id
                        res.json(newUser.id);
                    })
                    .catch(err => next(err));
                    
            })
    }
}