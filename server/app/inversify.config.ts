import { ResourceHub } from './hubs/resource.hub';
import { SkillsController } from './controllers/skills.controller';
import { Container } from "inversify";
import { Server } from "./server";
import { Application } from "./app";
import TYPES from "./types"

import { SkillsService } from './services/skills.service';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';

import { PlayerRepository } from './repository/player.repository';
import { SkillsRepository } from './repository/skills.repository';

import { RegistrableController } from "./controllers/registerable.controller";
import { LoginController } from "./controllers/login.controller";
import { RegisterController } from "./controllers/register.controller";

const container: Container = new Container();

container.bind(TYPES.Server).to(Server);
container.bind(TYPES.Application).to(Application);

// Controllers
container.bind<RegistrableController>(TYPES.Controller).to(LoginController);
container.bind<RegistrableController>(TYPES.Controller).to(RegisterController);
container.bind<RegistrableController>(TYPES.Controller).to(SkillsController);

// Services
container.bind<LoginService>(TYPES.LoginService).to(LoginService);
container.bind<RegisterService>(TYPES.RegisterService).to(RegisterService);
container.bind<SkillsService>(TYPES.SkillsService).to(SkillsService);

// Repositories
container.bind<PlayerRepository>(TYPES.PlayerRepository).to(PlayerRepository);
container.bind<SkillsRepository>(TYPES.SkillsRepository).to(SkillsRepository);

// Hubs
container.bind<ResourceHub>(TYPES.Hub).to(ResourceHub);

export { container };
