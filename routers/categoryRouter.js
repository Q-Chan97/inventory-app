import Router from "express";
import { categoryPath, newItemFormPath } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.post("/new", newItemFormPath());

categoryRouter.get("/new", (req, res) => {
    res.render("newItem", {title: "New Item"})
});

categoryRouter.get("/:category", categoryPath);

export default categoryRouter;