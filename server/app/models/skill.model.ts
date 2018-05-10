import { Player } from './player.model';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import 'reflect-metadata';

export interface SkillDTO {
    id?: number;
    name: string;
    level: number;
    experience: number;
    player: Player;
}

@Entity("skill")
export class SkillSchema implements SkillDTO{
    @PrimaryGeneratedColumn()
    public id: number;
    
    @OneToOne(type => Player)
    @JoinColumn()
    public player: Player;

    @Column({length : 16})
    public name: string;

    @Column()
    public level: number;

    @Column()
    public experience: number;
}
