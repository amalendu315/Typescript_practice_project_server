import { Request, Response } from 'express';
import * as service from './users_service';

export const getUser = async (req: Request, res: Response) => {
    try {
        const db = req.app.locals.db;
        const { id } = req.params;
        const user = await service.getUser(db,id);
        res.status(200).json(user);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserFriends = async (req: Request, res: Response) => {
    try {
        const db = req.app.locals.db;
        const { id } = req.params;
        const friends = await service.getUserFriends(db,id);
        res.status(200).json(friends);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const addRemoveFriend = async (req: Request, res: Response) => {
    try {
        const db = req.app.locals.db;
        const { id, friendId } = req.params;
        const user = await service.addRemoveFriend(db,id,friendId);
        res.status(200).json(user);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};