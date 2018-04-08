import { inject } from 'inversify';
import { PlayerRepository } from './../repository/player.repository';
import {injectable} from 'inversify';
import 'reflect-metadata';
import TYPES from "../types";

@injectable()
export class LoginService {
    @inject(TYPES.PlayerRepository)
    private playerRepository: PlayerRepository;

    public async login(player: any): Promise<boolean> {
        const res = await this.playerRepository.findByUsername(player.username);
        console.log(res);
        
        if ( res !== undefined) {
            if (res.password !== player.password) {
                throw new Error('You entered the wrong password.');
                
            } else {                
                return true;
            }
        } else {
            throw new Error('Username ' + player.username + ' does not exist.');
        }
    }
}