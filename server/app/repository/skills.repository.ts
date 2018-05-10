import { SkillDTO, SkillSchema } from './../models/skill.model';
import { Player } from './../models/player.model';
import { injectable } from 'inversify';
import { Repository, Connection, createConnection } from "typeorm";

@injectable()
export class SkillsRepository {
    private skillsRepository: Repository<SkillSchema>;

    constructor() {
        this.connect().then(async connection => {
            this.skillsRepository = connection.getRepository(SkillSchema);
        }).catch(err => console.log(err));
    }

    public async findAll(): Promise<Array<SkillDTO>> {
        return await this.skillsRepository.find();
    }

    public async create(skill: SkillDTO): Promise<SkillDTO> {        
        return await this.skillsRepository.save(skill);
    }

    public async update(skill: SkillDTO): Promise<SkillDTO> {
        return await this.skillsRepository.save(skill);
    }

    public async find(id: string): Promise<SkillDTO> {
        return await this.skillsRepository.findOneById(id);
    }

    public async findByPlayer(id: string): Promise<Array<SkillDTO>> {
        return await this.skillsRepository.find({ player: { id: Number(id)}});
    }

    private connect(): Promise<Connection> {
        return createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "rpg",
            entities: [
                SkillSchema, Player
            ],
            synchronize: true,
            logging: false
        });
    }
}