import { Request, Response, NextFunction } from 'express';
import * as service from './auth_service';
import { Db, ObjectId } from 'mongodb';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db: Db = req.app.locals.db;
        const data = await service.registerUser(db, req.body);
        res.status(200).json({
            user: data.user,
            token: data.token,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const db: Db = req.app.locals.db;
        const data = await service.loginUser(db, req.body);
        res.status(200).json({
            user: data.user,
            token: data.token,
        });
    } catch (error:any) {
        next(error);
    }
};

export {
    register,
    login,
}