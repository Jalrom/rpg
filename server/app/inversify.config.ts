import { UserRepository } from './repository/userRepository';
import { RegisterService } from './services/registerService';
import { LoginService } from './services/loginService';
import { Container } from "inversify";
import { Server } from "./server";
import { Application } from "./app";
import TYPES from "./types"

import { RegistrableController } from "./controllers/registerableController";
import { LoginController } from "./controllers/loginController";
import { RegisterController } from "./controllers/registerController";

const container: Container = new Container();

container.bind(TYPES.Server).to(Server);
container.bind(TYPES.Application).to(Application);

// Controllers
container.bind<RegistrableController>(TYPES.Controller).to(LoginController);
container.bind<RegistrableController>(TYPES.Controller).to(RegisterController);

// Services
container.bind<LoginService>(TYPES.LoginService).to(LoginService);
container.bind<RegisterService>(TYPES.RegisterService).to(RegisterService);

// Repositories
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
export { container };
