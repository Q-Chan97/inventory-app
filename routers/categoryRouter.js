import Router from "express";
import { categoryPath, deleteItemPath, getDetails, newItemFormPath, updateItemFormPath } from "../controllers/categoryController.js";
import { findItem, getCategoryNameById } from "../db/queries.js";

const categoryRouter = Router();

categoryRouter.post("/new", newItemFormPath());

categoryRouter.get("/new", (req, res) => {
    res.render("newItem", {title: "New Item"})
});

categoryRouter.post("/:category/:itemId/update", updateItemFormPath());
categoryRouter.get("/:category/:itemId/update", async (req, res) => {
    const { itemId } = req.params;

    const item = await findItem(itemId);
    const catLink = await getCategoryNameById(item.category_id)

    res.render("updateItem", {title: "Update Item", item: item, catLink: catLink});
});

categoryRouter.post("/:category/:itemId/delete", deleteItemPath);
categoryRouter.get("/:category/:itemId/delete", async (req, res) => {
    const { itemId } = req.params;

    const item = await findItem(itemId);
    const catLink = await getCategoryNameById(item.category_id);

    res.render("deleteView", {title: "Delete Item?", item: item, catLink: catLink})
});

categoryRouter.get("/:category/:itemId", getDetails);
categoryRouter.get("/:category", categoryPath);

export default categoryRouter;