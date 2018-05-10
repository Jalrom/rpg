const TYPES = {
        Server: Symbol('Server'),
        Application: Symbol('Application'),
        Routes: Symbol('Routes'),
        Index: Symbol('Index'),
        Controller: Symbol('Controller'),
        // Repositories
        PlayerRepository: Symbol('PlayerRepository'),
        SkillsRepository: Symbol('SkillsRepository'),
        // Services
        LoginService: Symbol('LoginService'),
        RegisterService: Symbol('RegisterService'),
        SkillsService: Symbol('SkillsService'),
        // Hubs
        Hub: Symbol('Hub'),
        ResourceHub: Symbol('ResourceHub')
};

export default TYPES;
