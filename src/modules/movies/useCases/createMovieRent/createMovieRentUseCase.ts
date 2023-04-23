import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { CreateMovieRentDTO } from '../../dtos/createMovieRentDTO';

export class CreateMovieRentUseCase {
    async execute({ 
        movieId,
        userId
    }: CreateMovieRentDTO): Promise<void> {
        
        // Verify if that movie exists
        const movieExists = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })
        
        if (!movieExists) {
            // Error message
            throw new AppError("Movie does not exists!");
        }

        
        // Verify if that movie is already rent
        const movieAlreadyRented = await prisma.movieRent.findFirst({
            where: {
                movieId
            }
        });
        
        if (movieAlreadyRented) {
            // Error message
            throw new AppError("Movie is already rented!");
        }

        // Verify if that user exists
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!userExists) {
            // Error message
            throw new AppError("User does not exists!");
        }

        // Create the movie rent
        await prisma.movieRent.create({
            data: {
                movieId,
                userId
            }
        })

    }
}