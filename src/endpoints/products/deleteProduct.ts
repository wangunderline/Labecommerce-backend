import { Request, Response } from "express";
import { db } from "../../database/knex";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await db("products").delete().where({ id: id });

    if (!result) {
      res.status(400);
      throw new Error("Id inexistente.");
    }

    res.status(200).send({ message: "Produto deletado." });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("erro inesperado");
    }
  }
};
