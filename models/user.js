const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?([a-zA-Z0-9\-._~%]+)\.[a-zA-Z]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)*#?$/i.test(
          v
        );
      },
    },
    message: "Enlace a avatar inválido",
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
