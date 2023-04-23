import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";

export class GetAllUsersController {
    async handle(req: Request, res: Response) {
        
        const getAllUsersController = new GetAllUsersUseCase();

        const users = await getAllUsersController.execute();

        return res.status(200).json(users)
    }
}