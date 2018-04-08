import { ILogin } from './login.interface';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Player } from '../player';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
    constructor(private http: Http) {}

    public login(player: Player): any {
        const body: ILogin = {
            username: player.username,
            password: player.password,
        };

        return this.http.post('/api/login', body)
        .map(res => res.json());
    }
}
