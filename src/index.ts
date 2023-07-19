console.log("iniciando");

import express from "express";
import cors from "cors";
import { getAllProducts } from "../src/endpoints/products/getAllProducts";
import { getAllUsers } from "./endpoints/users/getAllUsers";
import { createProduct } from "./endpoints/products/createProduct";
import { createUser } from "./endpoints/users/createUser";
import { deleteUser } from "./endpoints/users/deleteUser";
import { deleteProduct } from "./endpoints/products/deleteProduct";
import { editProductById } from "./endpoints/products/editProduct";
import { createPurchase } from "./endpoints/purchases/createPurchase";
import { getAllPurchases } from "./endpoints/purchases/getPurchases";
import { deletePurchaseById } from "./endpoints/purchases/deletePurchaseById";
import { getPurchaseById } from "./endpoints/purchases/getPurchaseById";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//gets
app.get("/users", getAllUsers);
app.get("/products", getAllProducts);
app.get("/purchases", getAllPurchases);
app.get("/purchases/:id", getPurchaseById);

//posts
app.post("/users", createUser);
app.post("/products", createProduct);
app.post("/purchases", createPurchase);

//deletes
app.delete("/users/:id", deleteUser);
app.delete("/products/:id", deleteProduct);
app.delete("/purchases/:id", deletePurchaseById);

//put
app.put("/products/:id", editProductById);
