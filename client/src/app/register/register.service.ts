import { IPlayer } from './../player.interface';
import { Player } from 'app/player';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

    constructor(private http: Http) {}

    public register(player: Player): Observable<number> {
        const body: IPlayer = {
            username: player.username,
            name: player.name,
            email: player.email,
            password: player.password,
            skills: []
        };

        return this.http.post('/api/register', body).map(
            res => res.json()
        );
    }
}
