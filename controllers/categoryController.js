import { selectInventoryFromCategory } from "../db/queries.js";

export async function categoryPath(req, res) {
    const { category } = req.params;

    function capitalize(cat) {
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
    const catTitle = capitalize(category);

    const inventory = await selectInventoryFromCategory(category);

    res.render("categoryView", {title: catTitle, inventory: inventory})
}