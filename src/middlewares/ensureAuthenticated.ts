import {Request, Response, NextFunction } from "express"
import { verify }from "jsonwebtoken"

interface IPayload {
    sub: string
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // receber token
    const authToken = request.headers.authorization
    
    
    // verificar se token    preenchido
    if(!authToken) {
        return response.status(401).end()
    }

    const [, token] = authToken.split(" ")
    
    try {
    // verificar se token valido
        const {sub} = verify( token, "cdc673995364f0c8fb7abae8b1f97fa7") as IPayload

        request.user_id = sub

    return next()

    } catch (err) {
        return response.status(401).end()
    }

    // recuperar informacoes do usuario
}