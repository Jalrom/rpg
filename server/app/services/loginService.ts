import { inject } from 'inversify';
import { UserRepository } from './../repository/userRepository';
import {injectable} from 'inversify';
import 'reflect-metadata';
import TYPES from "../types";
import { User } from "../models/user";

@injectable()
export class LoginService {
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository;

    public async verifyLogin(user: User): Promise<boolean> {

        // grab addresses from db
        const addresses = await this.userRepository.find('1').then(() =>
            {return true;}
        );

        return addresses;
    }
}