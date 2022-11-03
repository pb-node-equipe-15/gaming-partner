import { NextFunction, Request, Response } from "express";

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.users.isAdm){
        return res.status(403).json({
            message: "Permission danied!"
        })
    }

    next()
}

export default adminMiddleware;