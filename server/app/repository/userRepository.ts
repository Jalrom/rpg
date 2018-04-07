import { User } from './../models/user';
import { injectable } from 'inversify';
import { Repository, Connection, createConnection } from "typeorm";

@injectable()
export class UserRepository {
    private userRepository: Repository<User>;

    constructor() {
        this.connect().then(async connection => {
            this.userRepository = connection.getRepository(User);
        }).catch(err => console.log(err));
    }

    public async findAll(): Promise<Array<User>> {
        return await this.userRepository.find();
    }

    public async create(user: User): Promise<User> {        
        return await this.userRepository.save(user);
    }

    public async update(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    public async find(id: string): Promise<User> {
        return await this.userRepository.findOneById(id);
    }

    public async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({username: username});
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
                User
            ],
            synchronize: true,
            logging: false
        });
    }
}