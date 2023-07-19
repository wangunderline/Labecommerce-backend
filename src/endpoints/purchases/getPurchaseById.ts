import { Request, Response } from 'express'
import { db } from '../../database/knex'

export const getPurchaseById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
  
      const [purchase] = await db("purchases").where({ id });
  
      if (!purchase) {
        res.status(404).send("Compra não encontrada.");
        return;
      }
  
      const buyer = await db("users").where({ id: purchase.buyer }).first();
  
      const products = await db("products")
        .join("purchases_products", "products.id", "purchases_products.product_id")
        .where({ "purchases_products.purchase_id": id })
        .select("products.*");
  
      const result = {
        purchase_id: purchase.id,
        totalPrice: purchase.total_price,
        createdAt: purchase.created_at,
        buyerId: buyer.id,
        buyerName: buyer.name,
        buyerEmail: buyer.email,
        products,
      };
  
      res.status(200).send(result);
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
  };
  


