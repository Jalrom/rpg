
import "reflect-metadata";
import { injectable } from "inversify";

module Route {

    @injectable()
    export class Index {
        public getWord() {
        }
    }
}

export = Route;
