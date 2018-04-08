import { Player } from './../models/player.model';
import { injectable } from 'inversify';
import { Repository, Connection, createConnection } from "typeorm";

@injectable()
export class PlayerRepository {
    private playerRepository: Repository<Player>;

    constructor() {
        this.connect().then(async connection => {
            this.playerRepository = connection.getRepository(Player);
        }).catch(err => console.log(err));
    }

    public async findAll(): Promise<Array<Player>> {
        return await this.playerRepository.find();
    }

    public async create(player: Player): Promise<Player> {        
        return await this.playerRepository.save(player);
    }

    public async update(player: Player): Promise<Player> {
        return await this.playerRepository.save(player);
    }

    public async find(id: string): Promise<Player> {
        return await this.playerRepository.findOneById(id);
    }

    public async findByUsername(username: string): Promise<Player> {
        return await this.playerRepository.findOne({username: username});
    }

    public async findByEmail(email: string): Promise<Player> {
        return await this.playerRepository.findOne({email: email});
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
                Player
            ],
            synchronize: true,
            logging: false
        });
    }
}