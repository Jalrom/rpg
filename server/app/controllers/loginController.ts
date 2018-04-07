import * as express from 'express';
import {injectable} from 'inversify';
import {RegistrableController} from './RegisterableController';

@injectable()
export class LoginController implements RegistrableController {
    // private loginService: LoginService;
    private route: string;
    constructor() {
        this.route = '/api/login';
    }

    public register(app: express.Application): void {
        app.route(this.route)
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                console.log('login');
            })
    }
}