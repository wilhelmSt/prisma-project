import { User } from '@prisma/client'
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';

export class CreateUserUseCase {
    async execute({
        name,
        email
    }: CreateUserDTO): Promise<User> {
        
        // Verify that the user email already exists
        const userAlreadyExists = await prisma.user.findUnique({
            where: { 
                email
            }
        })

        if (userAlreadyExists) {
            // Error message
            throw new AppError("User already exists!");
        }

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        })

        return user;
    }
}