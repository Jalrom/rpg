import { PlayerGlobal } from './../player.global';
import { Component, OnInit } from '@angular/core';
import { StatsService } from 'app/stats/stats.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

    constructor(private player: PlayerGlobal, private statsService: StatsService) {}

    ngOnInit() {
        this.statsService.getSkills(this.player.id).subscribe((res) => {
            this.player.skills = res;
        });
    }

}
