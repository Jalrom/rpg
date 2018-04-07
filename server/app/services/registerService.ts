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
        const username = await this.userRepository.findByUsername(user.username);
        const email = await this.userRepository.findByEmail(user.email);
        if (username !== undefined) {
            throw new Error('Username already taken.');
        }
        if (email !== undefined) {
            throw new Error('Email already in use.');
        }
        return await this.userRepository.create(user);      
    }
}