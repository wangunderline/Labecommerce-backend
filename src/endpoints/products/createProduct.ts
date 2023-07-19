import { Request, Response } from "express";
import { TProducts } from "../../types";
import { db } from "../../database/knex";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, image_url } = req.body;

    if (typeof id !== "string") {
      return res.status(400).send("id precisa ser string");
    }

    if (typeof name !== "string") {
      return res.status(400).send("nome precisa ser string");
    }

    if (typeof price !== "number") {
      return res.status(400).send("preço precisa ser número");
    }

    if (typeof description !== "string") {
      return res.status(400).send("descrição precisa ser string");
    }

    if (typeof image_url !== "string") {
      return res.status(400).send("url precisa ser string");
    }

    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      image_url,
    };

    await db("products").insert(newProduct);

    res.status(200).send({ message: "Produto adicionado." });
  } catch (error: any) {
    console.log(error);

    if (error.code === "SQLITE_CONSTRAINT") {
      res.status(400).send("Id já cadastrado.");
    } else {
      if (res.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  }
};
