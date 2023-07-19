import { Request, Response } from 'express'
import { db } from '../../database/knex'

export const deletePurchaseById = async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const result = await db("purchases")
        .delete()
        .where({ id: idToDelete });
  
      if (!result) {
        res.status(400)
        throw new Error("Id inexistente.")
      }

    res.status(200).send({ message: "Pedido cancelado."})

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

