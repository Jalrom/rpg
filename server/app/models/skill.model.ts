import { Player } from './player.model';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import 'reflect-metadata';

@Entity()
export class Skill {
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
