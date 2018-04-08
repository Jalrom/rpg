import { Player } from './../models/player.model';
import { Skill } from './../models/skill.model';
import { injectable } from 'inversify';
import { Repository, Connection, createConnection } from "typeorm";

@injectable()
export class SkillsRepository {
    private skillsRepository: Repository<Skill>;

    constructor() {
        this.connect().then(async connection => {
            this.skillsRepository = connection.getRepository(Skill);
        }).catch(err => console.log(err));
    }

    public async findAll(): Promise<Array<Skill>> {
        return await this.skillsRepository.find();
    }

    public async create(skill: Skill): Promise<Skill> {        
        return await this.skillsRepository.save(skill);
    }

    public async update(skill: Skill): Promise<Skill> {
        return await this.skillsRepository.save(skill);
    }

    public async find(id: string): Promise<Skill> {
        return await this.skillsRepository.findOneById(id);
    }

    // public async findByPlayer(id: string): Promise<Array<Skill>> {
    //     return await this.skillsRepository.find({ player: { id: Number(id)}});
    // }

    private connect(): Promise<Connection> {
        return createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "rpg",
            entities: [
                Skill, Player
            ],
            synchronize: true,
            logging: false
        });
    }
}