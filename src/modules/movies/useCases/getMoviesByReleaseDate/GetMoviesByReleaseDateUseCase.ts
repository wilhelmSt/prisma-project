import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetMoviesByReleaseDateUseCase {
    async execute(): Promise<Movie[]> {
        const movies = await prisma.movie.findMany({
            orderBy: {
                release_date: "asc"
            }
        });
    
        return movies;
    }
} 