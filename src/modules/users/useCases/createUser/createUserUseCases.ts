import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

export class CreateUserUseCase {
    async execute({ name, email }: CreateUserDTO) {

        // Verify that the user email already exists
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        })  

        if (userAlreadyExists) {
            // error message
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