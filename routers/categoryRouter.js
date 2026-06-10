import Router from "express";
import { categoryPath } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/:category", categoryPath);

export default categoryRouter;