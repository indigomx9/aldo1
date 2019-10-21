import express from "express";
import { Item, IItem } from "../models/Item";

export const createItem = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const newItem: IItem = await new Item({
            name: req.body.name,
            description: req.body.description,
            amount: req.body.amount,
            image: req.body.image,
        })
        newItem.save().then((newItem) => 
            res.status(200).json(newItem))
    } catch (error) {
        res.status(500).json("Error: " + error);
        next(error);
    }
};

export const getAllItems = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const items: IItem[] = await Item.find();
        return res.status(200).json(items);
    } catch (error) {
        res.status(500).json("Error: " + error);
        next(error);
    }
};

export const getOneItem = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        await Item.findById(req.params.id)
            .then((item) => res.status(200).json(item))
    } catch (error) {
        res.status(500).json("Error: " + error);
        next(error);
    }
};

export const updateItem = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        await Item.findById(req.params.id).then((item) => {
            if (item != null) {
                item.name = req.body.name,
                item.description = req.body.description,
                item.amount = req.body.amount,
                item.image = req.body.image,
                item.save()
            }
            return res.status(200).json(item);
        });
    } catch (error) {
        res.status(500).json("Error: " + error);
        next(error);
    }
};

export const deleteItem = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        await Item.findByIdAndDelete(req.params.id)
            .then(() => res.status(200)
            .json("Item was deleted."))
    } catch (error) {
        res.status(500).json("Error: " + error);
        next(error);
    }
};


