import { Request, Response } from 'express'
import { db } from '../../database/knex'
import { TPurchaseProduct, TPurchases } from '../../types';

export const createPurchase = async (req: Request, res: Response) => {
    try {
      const { id, buyer, total_price, products } = req.body;
  
      if (!id || !buyer || !total_price || !products || products.length === 0) {
        res.status(400).send("Informe todos os campos.");
        return;
      }
  
      if (typeof id !== "string") {
        res.status(400).send("Id precisa ser uma string.");
        return;
      }
  
      if (typeof buyer !== "string") {
        res.status(400).send("O campo Buyer precisa ser uma string.");
        return;
      }
  
      if (id.length < 5) {
        res.status(400).send("Mínimo de 5 caracteres para o ID.");
        return;
      }
  
      if (typeof total_price !== "number" || total_price < 2.99) {
        res.status(400).send("O preço total deve ser um número com o valor mínimo de um de nossos produtos.");
        return;
      }
  
      if (products.length === 0) {
        res.status(400).send("Nenhum produto inserido, por favor insira ao menos um produto.");
        return;
      }
  
      const existingId = await db("purchases").where({ id }).first();
      if (existingId) {
        res.status(400).send("Pedido já existente.");
        return;
      }
  
      const existingBuyer = await db("users").where({ id: buyer }).first();
      if (!existingBuyer) {
        res.status(400).send("Este usuário não está registrado.");
        return;
      }
  
      const newPurchase: TPurchases = {
        id,
        buyer,
        total_price,
        created_at: new Date().toISOString(),
      };
  
      await db("purchases").insert(newPurchase);
  
      for (const product of products) {
        const { id: product_id, quantity } = product;
        const newPurchase_Product: TPurchaseProduct = {
          purchase_id: id,
          product_id,
          quantity,
        };
        await db("purchases_products").insert(newPurchase_Product);
      }
  
      res.status(200).send({ message: "Pedido cadastrado com sucesso." });
    } catch (error) {
      console.log(error);
  
      res.status(500).send("Erro inesperado");
    }
  };
  