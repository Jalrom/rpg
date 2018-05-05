import { PlayerGlobal } from './../player.global';
import { ISkill } from './../skill.interface';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SkillsService {
    constructor(private http: Http, private player: PlayerGlobal) {}

    public getSkills(): Observable<ISkill[]> {
        return this.http.get('/api/skills/' + this.player.id).map(res => res.json());
    }

    public createSkill(): Observable<any> {
        return this.http.post('/api/skills', {playerId: this.player.id});
    }

    public updateSkill(skill: ISkill): Observable<any> {
        return this.http.put('/api/skills/' + skill.id, skill);
    }
}
