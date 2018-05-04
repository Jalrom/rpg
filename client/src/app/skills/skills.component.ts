import { Skill } from './../skill';
import { PlayerGlobal } from './../player.global';
import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'app/skills/skills.service';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
    private miningSkill: Skill;

    constructor(private player: PlayerGlobal, private skillsService: SkillsService) {}

    public ngOnInit(): void {
        this.skillsService.getSkills(this.player.id).subscribe((res) => {
            this.player.skills = res;
            this.miningSkill = res.filter((skill) => {return skill.name === 'mining'; })[0];
            console.log(this.miningSkill);
            
        });
    }

    public nextlvlexp(level: number): number {
        return Math.pow((level) * 5, 2);
    }

}
