const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");

router.post(
  "/",
  /* 
  body("name").isLength({ max: 50 }),
  body("surname").isLength({ max: 50 }),
  body("password").isLength({ min: 5 }, { max: 20 }),
  body("email").isEmail().normalizeEmail(), */
  async (req, res, next) => {
    const { user } = req.body;
    try {
      const foundUser = await User.findOne({ email: user.email })
        .populate("favorites")
        .populate("cart._id")
        .populate("orders");

      if (foundUser) {
        res.json(foundUser);
      } else {
        /*  //Validaciones
            if (!name) return res.send("Debe agregar un nombre");
            if (!surname) return res.send("Debe agregar un apellido");
            if (!email) return res.send("Debe agregar un email");
            searchMail = await User.findOne({ email: email });
            if (searchMail) return res.send("El email ya existe");

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
        */
        const newUser = new User({
          email: user.email,
          name: user.name,
          picture: user.picture,
          nickname: user.nickname,
          /* picture: user.picture */
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
  const { shipping } = req.body;
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate({ _id: id }, { $addToSet: { shipping: shipping } }, {
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
router.post('/cart', async (req, res, next) => {
    let { cart, user } = req.body;

    try {

        let foundUser = await User.findOne({ email: user.email })
        if (!foundUser) {
            const newUser = new User({
                name: user.name,
                //surname: user.family_name,
                nickname: user.nickname,
                picture: user.picture,
                email: user.email
            })
            newUser.cart = cart
            const savedUser = await newUser.save();
        } else {
            //userCart = await User.updateOne({_id: foundUser._id}, { $push: { cart: cart } })
            //userCart = await User.updateOne({_id: foundUser._id}, { $addToSet: { cart: cart } })
            userCart = await User.updateOne({_id: foundUser._id}, { $set: { cart: cart } })
        }

        res.send('Se modifico el carrito')
    }
    catch (err) {
        next(err)
    }
})


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
router.delete('/:idUser/cart', async (req, res, next) => {
  const { idUser } = req.params;

  try {
      user = await User.updateOne({ _id: idUser }, { $pull: { cart: [] } })
      res.send('El carrito quedo vacio')
  } catch (err) {
      next(err)
  }
})

//Crear Ruta que retorne el carrito de un usuario
router.get('/:idUser/cart', async (req, res, next) => {
    const { idUser } = req.params;
    try {
        user = await User.findOne({ _id: idUser }).populate('cart._id')
        res.send(user.cart)
    } catch (err) {
        next(err)
    }
})


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

//Crear Ruta para agregar Domicilio a Shipping
router.post("/:idUser/shipping", async (req, res, next) => {
  const { idUser } = req.params;
  const { shipping } = req.body

  try {
    userShipping = await User.updateOne(
      { _id: idUser },
      { $addToSet: { shipping : shipping } }
    );
    res.send(userShipping);
  } catch (err) {
    next(err);
  }
});

router.post("/:idUser/purchaseEmail", async (req, res, next) => {
  const { idUser } = req.params;
  const { buyer, products, shipping, status, _id } = req.body

  try {
    user = await User.findOne({ _id: idUser });
    //if (savedOrder.status === "approved") {
      transporter.sendMail({
        from: '"Musical Ecommerce " <musical.ecommerce.henry@gmail.com>', // sender address
        to: buyer.email, // list of receivers
        subject: "Compra realizada correctamente", // Subject line
        attachDataUrls: true,
        html: `
    <h1 style="color: #207a1a;">Hola ${user.name}, Gracias por elegirnos!</h1>
    <p style="color: #000000">Tu compra se procesó correctamente, a continuación te dejamos los detalles de la misma: </p>
    <div style="background-color: #207a1a; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px 10px; font-weight: bold; border-radius: 5px;">
    <ul>
    <h3 style="color: #fff;">Producto/s: ${products}</h3>
    </ul>
    </div>
    <div style="background-color: #207a1a; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px 10px; font-weight: bold; border-radius: 5px;">
    <ul>
    <h3 style="color: #fff;">Dirección de entrega:</h3>
    <li style="color: #fff;">Ciudad: ${shipping.state}</li>
    <li style="color: #fff;">Calle: ${shipping.street}</li>
    <li style="color: #fff;">Número: ${shipping.number}</li>
    <li style="color: #fff;">Piso: ${shipping.floor}</li>
    <li style="color: #fff;">Entre calles: ${shipping.between}</li>
    <li style="color: #fff;">Código Postal: ${shipping.zip}</li>
    </ul>
    </div>
    <p style="color: #000000">Si eligió retiro en tienda, no olvide de mostrar este correo electrónico en la sucursal para recoger su compra.<br /><br />Número de Orden: <span style="font-weight: bold; text-decoration: underline;">${_id}</span><br /><br />All rights reserved by &copy; <a href="http://localhost:3000">Musical Ecommerce</a></p>
    `, // html body
      });
    //}

    res.send("El email se mando correctamente");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
