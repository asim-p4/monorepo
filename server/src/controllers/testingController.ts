import { Request, Response } from 'express';


export const testing = (_req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'Server is running',
    })
}