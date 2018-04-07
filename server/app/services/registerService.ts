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
        return await this.userRepository.create(user);
    }
}