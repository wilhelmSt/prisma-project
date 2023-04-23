import { Movie } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { CreateMovieDTO } from '../../dtos/CreateMovieDTO';

export class CreateMovieUseCase {
    async execute({ 
        title,
        duration,
        release_date
    }: CreateMovieDTO): Promise<Movie> {
        
        // Verify that the movie title already exists
        const movieAlreadyExists = await prisma.movie.findUnique({
            where: { 
                title
            }
        })

        if (movieAlreadyExists) {
            // Error message
            throw new AppError("Movie already exists!");
        }

        // Create the movie
        const movie = await prisma.movie.create({
            data: {
                title,
                duration,
                release_date
            }
        })

        return movie;
    }
}