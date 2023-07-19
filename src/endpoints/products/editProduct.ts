import { Request, Response } from 'express'
import { db } from '../../database/knex'

export const editProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newUrl = req.body.imageUrl as string | undefined

        if (newName !== undefined){
            if(typeof newName !== 'string'){
                res.status(400)
                throw new Error("nome precisa ser string");
            }
        }

        if(newPrice !== undefined){
            if(typeof newPrice !== "number"){
                res.status(400)
                throw new Error("Price deve ser do tipo number");   
            }
            if(newPrice < 0) {
                res.status(400)
                throw new Error("Price deve ser maior ou igual a 0")
            }
        }

        if (newDescription !== undefined){
            if(typeof newDescription !== 'string'){
                res.status(400)
                throw new Error("descrição precisa ser string");
            }
        }

        if (newUrl !== undefined){
            if(typeof newUrl !== 'string'){
                res.status(400)
                throw new Error("url precisa ser string");
            }
        }

        const [ product ] = await db.select('*').from('products').where({id: id})

        if (product) {
            await db.update({
                name: newName || product.name,
                price: newPrice || product.price,
                description: newDescription || product.description,
                image_url: newUrl || product.image_url})
                .from('products').where({ id: id})
        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        res.status(200).send({ message: "Atualização realizada com sucesso" })

    } catch (error) {
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("erro inesperado")
        }
    }
}