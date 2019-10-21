import express from "express";
import { createItem, getAllItems, getOneItem, 
    updateItem, deleteItem } from "../controllers/itemCon";

const router: express.Router = express.Router();
    router.post("/item", createItem);
    router.get("/item", getAllItems);
    router.get("/item/:id", getOneItem);
    router.patch("/item/:id", updateItem);
    router.delete("/item/:id", deleteItem);

export default router;


