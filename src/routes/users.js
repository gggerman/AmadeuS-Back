const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const jwtCheck = require("../config/auth");

router.post("/", jwtCheck, async (req, res, next) => {
    const { user } = req.body;
    try {
      const foundUser = await User.findOne({ mail: user.email })
        .populate("favorites")
        .populate("cart._id")
        .populate("orders");

      if (foundUser) {
        res.json(foundUser);
      } else {
        const newUser = new User({
          mail: user.email,
          name: user.name,
          picture: user.picture,
          nickname: user.nickname,
        });

        const userSaved = await newUser.save();
        res.json(userSaved);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    user = await User.findByIdAndDelete(id);
    res.send("User has been successfully removed");
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  // const { name, surname, password, mail, phone} = req.body;
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    //res.json(updatedCategory)
    res.send("The user has been successfully modified");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find()
      .populate("cart")
      .populate("orders")
      .populate("favorites");
    //res.json(updatedCategory)
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    user = await User.findById(id)
      .populate("cart")
      .populate("orders")
      .populate("favorites");
    //res.json(updatedCategory)
    res.send(user);
  } catch (err) {
    next(err);
  }
});

//Ruta para agregar todos los productos del local storage al carrito
router.post("/cart", async (req, res, next) => {
  let { cart, user } = req.body;

  try {
    let foundUser = await User.findOne({ mail: user.email });
    if (!foundUser) {
      const newUser = new User({
        name: user.name,
        //surname: user.family_name,
        nickname: user.nickname,
        picture: user.picture,
        mail: user.email,
      });
      newUser.cart = cart;
      const savedUser = await newUser.save();
    } else {
      //userCart = await User.updateOne({_id: foundUser._id}, { $push: { cart: cart } })
      //userCart = await User.updateOne({_id: foundUser._id}, { $addToSet: { cart: cart } })
      userCart = await User.updateOne(
        { _id: foundUser._id },
        { $set: { cart: cart } }
      );
    }

    res.send("Se modifico el carrito");
  } catch (err) {
    next(err);
  }
});

//Crear Ruta para agregar Item al Carrito
router.post("/:idUser/cart/:idProduct", async (req, res, next) => {
  const { idUser, idProduct } = req.params;

  try {
    user = await User.updateOne(
      { _id: idUser },
      { $addToSet: { cart: [idProduct] } }
    );
    res.send("El item se agrego correctamente");
  } catch (err) {
    next(err);
  }
});

//Crear Ruta para vaciar el carrito
router.delete("/:idUser/cart", async (req, res, next) => {
  const { idUser } = req.params;

  try {
    user = await User.updateOne({ _id: idUser }, { $pull: { cart: [] } });
    res.send("El carrito quedo vacio");
  } catch (err) {
    next(err);
  }
});

//Crear Ruta que retorne el carrito de un usuario
router.get("/:idUser/cart", async (req, res, next) => {
  const { idUser } = req.params;
  try {
    user = await User.findOne({ _id: idUser }).populate("cart._id");
    res.send(user.cart);
  } catch (err) {
    next(err);
  }
});

//Crear Ruta que retorne todas las Ordenes de los usuarios
router.get("/:id/orders", async (req, res, next) => {
  const { id } = req.params;

  try {
    let user = await User.findOne({ _id: id }).populate("orders");
    if (user.orders.length) {
      res.json(user.orders);
    } else {
      res.status(404).send("No orders found");
    }
  } catch (err) {
    next(err);
  }
});

//Crear Ruta que retorne todos los favoritos de un usuario
router.get("/:idUser/favorites", async (req, res, next) => {
  const { idUser } = req.params;

  try {
    let user = await User.findOne({ _id: idUser }).populate("favorites");
    if (user.favorites.length) {
      res.json(user.favorites);
    } else {
      res.status(404).send("No favorites found");
    }
  } catch (err) {
    next(err);
  }
});

//Crear Ruta para agregar Item a Favoritos
router.post("/:idUser/favorites/:idProduct", async (req, res, next) => {
  const { idUser, idProduct } = req.params;

  try {
    let user = await User.updateOne(
      { _id: idUser },
      { $addToSet: { favorites: [idProduct] } }
    );
    res.send("El item se agrego correctamente");
  } catch (err) {
    next(err);
  }
});

//Crear Ruta para eliminar Item de Favoritos
router.delete("/:idUser/favorites/:idProduct", async (req, res, next) => {
  const { idUser, idProduct } = req.params;

  try {
    let user = await User.updateOne(
      { _id: idUser },
      { $pull: { favorites: idProduct } }
    );
    res.send("El item se eliminó correctamente");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
