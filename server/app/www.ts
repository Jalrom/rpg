import { Server } from "./server";
import TYPES from "./types";
import "reflect-metadata";
import { container } from "./inversify.config";

const server: Server = container.get<Server>(TYPES.Server);

server.init();
