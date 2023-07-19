import { Request, Response } from 'express'
import { db } from '../../database/knex'

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        if (!name) {
            const result = await db("products")
            res.status(200).send(result)
        } else {
            const response = await db('products').select().where('name', 'LIKE', `%${name}%`)
            
            if (response.length === 0) {
                res.status(404).send("Nenhum produto encontrado com o nome especificado.")
            } else {
                res.status(200).send(response)
            }
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}