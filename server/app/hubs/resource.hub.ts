import { RegistrableHub } from './registerable.hub';
import { injectable } from 'inversify';

// @injectable()
// export class ResourceHub implements RegistrableHub{

//     constructor(io: SocketIO.Namespace, socket: SocketIO.Socket) {
//             socket.on('login', () => {
//                 console.log('resource login');
//             });
//             socket.on('test', () => {
//                 console.log('test');
//             })
//             socket.emit('test', 'ball', socket.id);
//     }

//     register(): void {
//         console.log('Method not implemented.');
//     }
//     disconnect(): void {
//         console.log('Method not implemented.');
//     }
// }

@injectable()
export class ResourceHub implements RegistrableHub{
    private nsp: SocketIO.Namespace;

    constructor(io: SocketIO.Server) {
        this.nsp = io.of('/resource');
        this.nsp.on('connect', (socket: SocketIO.Socket) => {
            socket.on('login', () => {
                console.log('resource login');
            });
            socket.on('test', () => {
                console.log('test');
            })
            socket.emit('test', 'ball', socket.id);
        })
    }

    register(): void {
        console.log('Method not implemented.');
    }
    disconnect(): void {
        console.log('Method not implemented.');
    }
}