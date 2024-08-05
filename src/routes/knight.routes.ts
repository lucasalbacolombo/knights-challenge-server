import { Request, Response, NextFunction, Router } from "express";
const router = Router();
import knightModel from "../models/Knight.model";
import { validationResult } from "express-validator";

router.post(
  "/knights",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const createdKnight = await knightModel.create(req.body);

      res.status(201).json(createdKnight);
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  "/knights",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filter } = req.query;
      if (filter === "heroes") {
        res.status(200).send(await knightService.getAllHeroesStats());
      } else {
        res.status(200).send(await knightService.getAllKnightsStats());
      }
    } catch (err) {
      return next(err);
    }
  }
);

// router.get(
//   "/:flightId",
//   isAuth,
//   attachCurrentUser,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { flightId } = req.params;

//       const foundFlight = await knightModel
//         .findOne({ _id: flightId })
//         .populate("aircraft");

//       return res.status(200).json(foundFlight);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//   }
// );

// router.patch(
//   "/edit/:flightId",
//   isAuth,
//   attachCurrentUser,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { flightId } = req.params;

//       const body = { ...req.body };

//       delete body.aircraft;

//       const updatedFlight = await knightModel.findOneAndUpdate(
//         { _id: flightId },
//         { ...body },
//         { new: true, runValidators: true }
//       );
//       return res.status(200).json(updatedFlight);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//   }
// );

// router.delete(
//   "/delete/:flightId",
//   isAuth,
//   attachCurrentUser,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { flightId } = req.params;
//       const loggedInUser = req.currentUser;

//       const deleteFlight = await knightModel.deleteOne({
//         _id: req.params.flightId,
//       });

//       await AircraftModel.updateMany(
//         { flight: flightId },
//         { $pull: { flight: flightId } }
//       );

//       await UserModel.findOneAndUpdate(
//         { _id: loggedInUser._id },
//         { $pull: { flight: flightId } },
//         { runValidators: true }
//       );

//       return res.status(200).json(deleteFlight);
//     } catch (err) {
//       console.log(err);

//       return res.status(500).json(err);
//     }
//   }
// );

export default router;
