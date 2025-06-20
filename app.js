const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/aroundb");
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6854f60e479442f59f46afcc",
  };
  next();
});
app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.get("/", (req, res) => {
  res.status(404);
  res.send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
