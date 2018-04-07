import { IUser } from './../user.interface';
import { User } from './../user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

    constructor(private http: Http) {}

    public register(user: User): Observable<IUser> {
        const body: IUser = {
            username: user.username,
            name: user.name,
            email: user.email,
            password: user.password
        };

        return this.http.post('/api/register', body).map(
            (res) => res.json()
        );
    }
}
