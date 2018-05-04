import { Skill } from './../skill';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SkillsService {
    constructor(private http: Http) {}

    public getSkills(playerId: number): Observable<Skill[]> {
        return this.http.get('/api/skills/' + playerId).map(res => res.json());
    }

    public createSkill(playerId: number): Observable<any> {
        return this.http.post('/api/skills', {playerId: playerId});
    }
}
