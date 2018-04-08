import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({length : 16, unique: true})
    public username: string;

    @Column({length : 32})
    public name: string;

    @Column({length: 254, unique: true})
    public email: string;

    @Column()
    public password: string;
}
