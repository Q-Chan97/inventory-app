import { body, validationResult, matchedData } from "express-validator";

import { addNewItem, getCategoryNameById, selectInventoryFromCategory, findItem, editItem, deleteItem } from "../db/queries.js";

export async function categoryPath(req, res) {
    const { category } = req.params;

    function capitalize(cat) {
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
    const catTitle = capitalize(category);

    const inventory = await selectInventoryFromCategory(category);

    res.render("categoryView", {title: catTitle, inventory: inventory, catLink: category})
}

const validateNewItem = [
    body("category")
        .isInt()
        .toInt(),
    body("itemName").trim(),
    body("quantity")
        .isInt()
        .toInt(),
    body("rating")
        .optional()
        .isNumeric()
        .toFloat(),
    body("proof")
        .isNumeric()
        .isLength({max: 6})
        .toFloat(),
    body("notes").trim()
        .optional()
        .isLength({max: 180}).withMessage("Notes cannot be longer than 180 characters"),
]

export function newItemFormPath() {
    return [
        validateNewItem,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("newItem", {
                    title: "New Item",
                    errors: errors.array(),
                    formData: req.body
                });
            };

            const { category, itemName, quantity, rating, notes, proof } = matchedData(req);

            await addNewItem(category, itemName, quantity, rating, notes, proof);

            const catName = await getCategoryNameById(category);
            res.redirect(`/cat/${catName}`);
        }
    ]
}

export async function getDetails(req, res) {
    const { itemId } = req.params;

    const item = await findItem(itemId);

    const catName = await getCategoryNameById(item.category_id);

    res.render("details", {title: item.name, item: item, category: catName});
}

export function updateItemFormPath() {
    return [
        validateNewItem,
        async (req, res) => {
            const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).render("updateItem", {
                        title: "Update Item",
                        errors: errors.array(),
                        formData: req.body
                    });
                };
        
            const { itemId } = req.params
        
            const { category, itemName, quantity, rating, notes, proof } = matchedData(req);

            await editItem(itemId, category, itemName, quantity, rating, notes, proof);

            const catName = await getCategoryNameById(category);
            res.redirect(`/cat/${catName}/${itemId}`);
        }
    ]
}

export async function deleteItemPath(req, res) {
    const { itemId } = req.params;

    const item = await findItem(itemId);

    const catName = await getCategoryNameById(item.category_id);

    await deleteItem(itemId);

    res.redirect(`/cat/${catName}`);
}