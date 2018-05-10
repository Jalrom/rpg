import { inject } from 'inversify';
import { LoginService } from '../services/login.service';
import * as express from 'express';
import { injectable } from 'inversify';
import { RegistrableController } from './registerable.controller';
import TYPES from '../types';

@injectable()
export class LoginController implements RegistrableController {
    @inject(TYPES.LoginService) 
    private loginService: LoginService;
    private route: string;
    constructor() {
        this.route = '/api/login';
    }

    public register(app: express.Application): void {
        app.route(this.route)
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {                
                const login = {
                    username: req.body.username,
                    password: req.body.password
                }                
                await this.loginService.login(login).then(resp => res.json(resp)).catch(err => next(err));
            })
    }
}