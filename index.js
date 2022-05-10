import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const currentdir = path.resolve();
const filepath = path.join(currentdir, "/public/data.json");

app.use(express.json());


app.use("/", express.static("public"));

app.get("/todos", (req, res) => {
    fs.promises.readFile(filepath, "utf8").then((todos) => {
        res.send(todos);
    });
});

app.post("/todos", (req, res) => {
    fs.promises.writeFile(filepath, JSON.stringify(req.body, undefined, 2))
        .then(() => {
            res.send("aaa");
        });
});

app.get("/", function (req, res) {
    res.sendFile("/public/index.html");
}).listen(80);