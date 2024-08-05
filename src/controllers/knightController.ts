import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import knightModel from "../models/Knight.model";

const knightsController = {
  getAllKnights: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const knights = await knightModel.find();
      res.json(knights);
    } catch (error) {
      return next(error);
    }
  },

  getKnightById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const knight = await knightModel.findById(req.params.id);
      if (!knight) {
        return res.status(404).json({ error: "Knight not found" });
      }
      res.json(knight);
    } catch (error) {
      return next(error);
    }
  },

  createKnight: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const knight = new knightModel(req.body);
      const savedKnight = await knight.save();
      res.status(201).json(savedKnight);
    } catch (error) {
      return next(error);
    }
  },

  updateKnight: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedKnight = await knightModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedKnight) {
        return res.status(404).json({ error: "Knight not found" });
      }
      res.json(updatedKnight);
    } catch (error) {
      return next(error);
    }
  },

  deleteKnight: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const knight = await knightModel.findByIdAndUpdate(
        req.params.id,
        { hallOfFame: true },
        { new: true }
      );
      if (!knight) {
        return res.status(404).json({ error: "Knight not found" });
      }
      res.json({ message: "Knight deleted and added to Hall of Fame" });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = knightsController;
