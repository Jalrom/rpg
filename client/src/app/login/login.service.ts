import { ILogin } from './login.interface';
import { IUser } from './../user.interface';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../user';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
    constructor(private http: Http) {}

    public login(user: User): any {
        const body: ILogin = {
            username: user.username,
            password: user.password,
        };

        return this.http.post('/api/login', body)
        .map(res => res.json());
    }
}
