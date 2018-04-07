import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "./types";
import { Index } from "./routes/index";

@injectable()
export class Routes {
    
    public constructor(@inject(Types.Index) private index: Index) {}
    
    public get routes(): Router {        
        const router: Router = Router();        
        router.post("/api/login/",
        (req: Request, res: Response, next: NextFunction) => {
            res.json({test: "test"});
        });
        
        router.post("/api/register/",
        (req: Request, res: Response, next: NextFunction) => {
            res.json({test: "test"});
            this.index.getWord();
        });
        
        return router;
    }
}
