import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class ResourceHub {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = socketIo(SERVER_URL + '/resource');
        this.socket.on('test', () => console.log('test success'));
        this.socket.emit('login');
    }
}
