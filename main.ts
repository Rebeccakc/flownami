// @ts-types="npm:@types/express"
import express from "npm:express";
const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));

app.use(express.urlencoded());
app.get("/", function (_, res) {
  res.render("pages/index");
});

type Column = {
  name: string;
  tasks: Array<Task>;
};

type Task = {
  name: string;
};

app.get("/board", function (_req, res) {
  const columns: Array<Column> = JSON.parse(
    Deno.readTextFileSync("database.json"),
  );

  res.render("pages/board", { columns });
});

app.get("/create", function (_req, res) {
  res.render("pages/create");
});

app.post("/create", function (req, res) {
  const data = req.body;
  console.log(data);
});

const port = Deno.env.get("PORT") || 8080;
app.listen(port);
console.log(`Server is listening on port ${port}`);
