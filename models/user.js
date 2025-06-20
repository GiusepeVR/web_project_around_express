const mongoose = require("mongoose");

const urlRegex =
  /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9._~:\/?%#\[\]@!$&'()*+,;=-]*$/;

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
        return urlRegex.test(v);
      },
      message: "Enlace a avatar inválido",
    },
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
