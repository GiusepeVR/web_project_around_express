const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;
const cardsPath = path.join(__dirname, "/data/cards.json");
const usersPath = path.join(__dirname, "/data/users.json");

app.get("/users", (req, res) => {
  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(JSON.parse(data));
  });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.send({ message: "ID de usuario no encontrado" });
      return;
    }

    const user = JSON.parse(data).find((e) => e._id === userId);
    if (!user) {
      res.status(404);
      res.send({ message: "ID de usuario no encontrado" });
      return;
    }
    res.send(user);
  });
});

app.get("/cards", (req, res) => {
  fs.readFile(cardsPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(JSON.parse(data));
  });
});

app.get("/", (req, res) => {
  res.status(404);
  res.send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
