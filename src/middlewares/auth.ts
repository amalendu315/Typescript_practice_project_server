import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config';


export const verifyToken = (req: any, res: Response, next:NextFunction) => {
    try {
        let token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        const decoded = jwt.verify(token, JWT_CONFIG.secret);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};