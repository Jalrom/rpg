import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column({length : 16})
    public username: string;
    @Column({length : 32})
    public name: string;
    @Column({length: 254})
    public email: string;
    @Column()
    public password: string;
}
