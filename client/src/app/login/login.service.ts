import { IPlayer } from './../player.interface';
import { ILogin } from './login.interface';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PlayerGlobal } from '../player.global';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
    constructor(private http: Http) {}

    public login(player: PlayerGlobal): Observable<IPlayer> {
        const body: ILogin = {
            username: player.username,
            password: player.password,
        };

        return this.http.post('/api/login', body).map(res => res.json());
    }
}
