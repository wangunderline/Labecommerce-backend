import { Request, Response } from "express";
import { db } from "../../database/knex";

export const getAllPurchases = async (req: Request, res: Response) => {
  try {
    const result = await db("purchases").select();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("erro inesperado");
  }
};
