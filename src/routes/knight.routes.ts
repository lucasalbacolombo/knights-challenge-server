import express from "express";
const knightsController = require("../controllers/knightController");

const router = express.Router();

router.get("/knights", knightsController.getAllKnights);
router.get("/knights/:id", knightsController.getKnightById);
router.post("/knights", knightsController.createKnight);
router.put("/knights/:id", knightsController.updateKnight);
router.delete("/knights/:id", knightsController.deleteKnight);

export default router;
