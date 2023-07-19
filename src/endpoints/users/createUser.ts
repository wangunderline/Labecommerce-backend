import { Request, Response } from "express";
import { TUsers } from "../../types";
import { db } from "../../database/knex";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (typeof id !== "string") {
      return res.status(400).send("id precisa ser uma string");
    }

    if (typeof name !== "string") {
      return res.status(400).send("name precisa ser uma string");
    }

    if (typeof email !== "string") {
      return res.status(400).send("email precisa ser uma string");
    }

    if (typeof password !== "string") {
      return res.status(400).send("senha precisa ser uma string");
    }

    const [existingId] = await db("users").where({ id });

    if (existingId) {
      return res.status(400).send("Id já cadastrado.");
    }

    const [existingEmail] = await db("users").where({ email });

    if (existingEmail) {
      return res.status(400).send("Email já cadastrado.");
    }

    const newUser: TUsers = {
      id,
      name,
      email,
      password
    };

    await db("users").insert(newUser);

    res.status(200).send({ message: "Usuário cadastrado." });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};
