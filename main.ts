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

function readDatabase() {
  return JSON.parse(
    Deno.readTextFileSync("database.json"),
  );
}

function writeDatabase(columns: Array<Column>) {
  Deno.writeTextFileSync("database.json", JSON.stringify(columns));
}

app.get("/board", function (_req, res) {
  const columns: Array<Column> = readDatabase();

  res.render("pages/board", { columns });
});

app.get("/tasks/new", function (_req, res) {
  res.render("pages/create");
});

app.post("/tasks", function (req, res) {
  const columns: Array<Column> = readDatabase();
  columns[0].tasks.push({ name: req.body.taskName });
  writeDatabase(columns);
  res.redirect("/board");
});

const port = Deno.env.get("PORT") || 8080;
app.listen(port);
console.log(`Server is listening on port ${port}`);
