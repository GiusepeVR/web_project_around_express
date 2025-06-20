const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .orFail(new Error("No se encontraron usuarios"))
    .then((users) => res.send(users))
    .catch((err) => {
      console.log(err);
      res.status(404).send({ message: "No hay usuarios" });
    });
};

const getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .orFail(new Error("Usuario no encontrado"))
    .then((foundUser) => res.send(foundUser))
    .catch((err) => {
      console.log(err);
      res.status(404).send({ message: "Usuario no encontrado" });
    });
};

const createUser = (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((createdUser) => res.send({ data: createdUser }))
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error al crear el usuario" });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(new Error("Usuario no encontrado"))
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error al actualizar el usuario" });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(new Error("Usuario no encontrado"))
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error al actualizar el avatar" });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
