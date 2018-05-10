import { inject } from 'inversify';
import { PlayerRepository } from './../repository/player.repository';
import {injectable} from 'inversify';
import 'reflect-metadata';
import TYPES from "../types";

@injectable()
export class LoginService {
    @inject(TYPES.PlayerRepository)
    private playerRepository: PlayerRepository;

    public async login(player: any): Promise<any> {
        const res = await this.playerRepository.findByUsername(player.username);
        
        if ( res !== undefined) {
            if (res.password !== player.password) {
                throw new Error('You entered the wrong password.');
                
            } else {                
                return res;
            }
        } else {
            throw new Error('Username ' + player.username + ' does not exist.');
        }
    }
}