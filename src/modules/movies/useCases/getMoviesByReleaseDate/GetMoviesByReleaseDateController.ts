import { Request, Response } from "express";
import { GetMoviesByReleaseDateUseCase } from "./getMoviesByReleaseDateUseCase";

export class GetMoviesByReleaseDateController {
    async handle(req: Request, res: Response) {

        const getMoviesByReleaseDateController = new GetMoviesByReleaseDateUseCase();

        const result = await getMoviesByReleaseDateController.execute();

        return res.status(201).json(result);
    }
}