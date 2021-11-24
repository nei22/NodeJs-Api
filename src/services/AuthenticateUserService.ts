import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


import { UsersRepositories } from "../repositories/UsersRepositories"




interface IAuthenticateRequest {
    email:string;
    password:string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories)
        // verificar se existe email 
        const  user = await usersRepositories.findOne({
            email,
        })
        if(!user) {
            throw new Error("Email/Password incorrest!")
        }
        // verificar se existe senha
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrest!")
        }
        //  gerar token
        const token = sign(
            {
            email: user.email,
            },
            "cdc673995364f0c8fb7abae8b1f97fa7",{
                subject: user.id,
                expiresIn: "1d"
            }
        );
        return token;
    }


}
export { AuthenticateUserService }