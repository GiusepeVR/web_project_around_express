const Card = require("../models/cards");

const getCards = (req, res) => {
  Card.find({})
    .orFail(new Error("No se encontraron publicaciones"))
    .then((cards) => res.send(cards))
    .catch((err) => {
      console.log(err);
      res.status(404).send({ message: "No hay tarjetas" });
    });
};

const createCard = (req, res) => {
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner })
    .then((createdCard) => res.send({ data: createdCard }))
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error al crear la tarjeta" });
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail(new Error("Tarjeta no encontrada"))
    .then(() => res.send({ message: "Tarjeta eliminada" }))
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error al eliminar la tarjeta" });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Tarjeta no encontrada"))
    .then((updatedCard) => res.send(updatedCard))
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error al dar me gusta a la tarjeta" });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Tarjeta no encontrada"))
    .then((updatedCard) => {
      res
        .status(200)
        .send({ message: "Me gusta eliminado de la tarjeta", updatedCard });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send({ message: "Error al quitar me gusta a la tarjeta" });
    });
};
module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
