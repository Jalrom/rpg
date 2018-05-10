import { injectable } from 'inversify';
import { RegistrableHub } from './registerable.hub';

@injectable()
export class ResourceHub implements RegistrableHub {
    register(): void {
        console.log('Method not implemented.');
    }
    disconnect(): void {
        console.log('Method not implemented.');
    }
}