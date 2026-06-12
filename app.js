import express from "express";
import path from "node:path";
import categoryRouter from "./routers/categoryRouter.js";

const app = express();

const PORT = process.env.PORT || 8080;

const __dirname = import.meta.dirname;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use("/cat", categoryRouter);

app.use("/", (req, res) => {
    res.render("index");
});

// Unmatched routes
app.use((req, res) => {
    res.status(404).render("404Page");
})

//Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).render("404Page");
})

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Express server listening on port ${PORT}`);
})