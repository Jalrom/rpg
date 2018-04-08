import { inject, injectable } from 'inversify';
import { PlayerRepository } from './../repository/player.repository';
import 'reflect-metadata';
import { Player } from "../models/player.model";
import TYPES from "../types";

@injectable()
export class RegisterService {
    @inject(TYPES.PlayerRepository)
    private playerRepository: PlayerRepository;

    public async createUser(player: Player): Promise<Player> {
        const username = await this.playerRepository.findByUsername(player.username);
        const email = await this.playerRepository.findByEmail(player.email);
        if (username !== undefined) {
            throw new Error('Username already taken.');
        }
        if (email !== undefined) {
            throw new Error('Email already in use.');
        }
        return await this.playerRepository.create(player);      
    }
}