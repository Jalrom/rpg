import { ISkill } from './../skill.interface';
import { Skill } from './../skill';
import { PlayerGlobal } from './../player.global';
import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'app/skills/skills.service';

const NUM_ROWS = 4;
const NUM_COLS = 3;
@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
    private skills: Skill[][];
    private currentSkill: Skill;
    private isOpenSkills: boolean;

    public constructor(private player: PlayerGlobal, private skillsService: SkillsService) {
        this.isOpenSkills = false;
        this.skills = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            this.skills[i] = [];
            for (let j = 0; j < NUM_COLS; j++) {
                this.skills[i][j] = new Skill();
            }
        }
    }

    public ngOnInit(): void {
        this.skillsService.getSkills().subscribe((res) => {
            for (let i = 0; i < res.length; i++) {
                this.player.skills.push(Object.assign(new Skill(), res[i]));
            }
            this.player.skills.sort(this.sortById);

            for (let i = 0; i < this.player.skills.length; i++) {
                const x = Math.floor(i / NUM_COLS);
                const y = i % NUM_COLS;
                this.skills[x][y] = this.player.skills[i];
            }
        });
    }

    private sortById(a: ISkill, b: ISkill): number {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    }

    public openDetails(i: number, j: number): void {
        this.currentSkill = this.player.skills[i * NUM_COLS + j];
    }

    public openSkills(event: MouseEvent): void {
        this.isOpenSkills = true;
    }

    public closeSkills(event: MouseEvent) {
        this.isOpenSkills = false;
    }

    public onMouseMove(event: MouseEvent) {
        event.stopPropagation();
    }

    public setStyles(): any {
        const styles = {
            // CSS property names
            'width': (this.currentSkill.experience / this.currentSkill.calculateNextLevelExperience(this.currentSkill.level)) * 100 + '%',
        };
        return styles;
    }
}
