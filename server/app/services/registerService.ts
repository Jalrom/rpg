import { inject } from 'inversify';
import { UserRepository } from './../repository/userRepository';
import {injectable} from 'inversify';
import 'reflect-metadata';
import { User } from "../models/user";
import TYPES from "../types";

@injectable()
export class RegisterService {
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository;

    public async createUser(user: User): Promise<User> {
        const res = await this.userRepository.findByUsername(user.username);
        if ( res === undefined ) {
            return await this.userRepository.create(user);
        } else {
            throw new Error('Username already taken.');
        }        
    }
}