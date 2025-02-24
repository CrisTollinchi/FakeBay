import express, { query } from "express";
import { Users } from "../schemas/userSchema.js";
import repo from "../repo/productRepo.js";
import dotenv from "dotenv"
import mongodb from "mongodb"


const sellProductsRoute = express.Router();

// Adding products the User wants to sell
sellProductsRoute.post("/addProductToSell/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  let existingUser;
  // let category = req.query.category;

  try {
    // find user in database and store in variable
    existingUser = await Users.findById(id);
  } catch (err) {
    console.log({ message: err });
  }
  if (!existingUser || existingUser.password !== password) {
    return res.status(401).json({
      success: false,
      data: { message: "Credentials do not match" },
    });
  }
  try {
    // conditional to make sure the req has all required fields
    if (
      !req.body.title ||
      !req.body.category ||
      !req.body.bid ||
      !req.body.type ||
      !req.body.description ||
      !req.body.yearBought ||
      !req.body.type
    ) {
      return res.status(400).json({
        success: false,
        data: { message: "You must fill out all fields." },
      });
    }
    // storing new product in an object to be pushed into auctionOff array in database
    const newProduct = {
      id: req.body.id,
      title: req.body.title,
      type: req.body.type,
      category: req.body.category,
      description: req.body.description,
      yearBought: req.body.yearBought,
      bid: req.body.bid,
      type: req.body.type,
    };
    // spread operator to keep existing data when adding new products
    existingUser.auctionOff = [...existingUser.auctionOff, newProduct];
    // saves the new product to existing user
    const savedUser = await existingUser.save();
    // a response to let user know that the product has been added successfully
    return res
      .status(201)
      .json({ success: true, data: { message: "Product has been added!" } });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

// deletes the chosen product
sellProductsRoute.delete("/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;
  // variables to do validation checks
  let { username, password } = req.body;
  let existingUser;
  try {
    existingUser = await Users.findOne({
      username: username,
      password: password,
    });
    if (
      existingUser.password === password &&
      existingUser.username === username
    ) {
      existingUser.auctionOff.id(id).deleteOne();
      await existingUser.save();
      return res.status(200).json({
        success: true,
        message: "Product was deleted",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Credentials don't match",
      });
    }
  } catch (err) {
    console.log({ message: err });
    res.status(500).send({ message: err.message });
  }
});

// finds products based on category
sellProductsRoute.get("/categories/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const result = await Users.find({ "auctionOff.category": category });

    const filteredData = result.map((x) => {
      const data = x.auctionOff.filter((y) => y.category === category);
      const seller = {
        id: x._id,
        username: x.username,
        data: data,
      };
      return seller;
    });

    res.status(200).json(filteredData);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(
        "Nobody is selling any products in that category right now. Check again in the near future!"
      );
  }
});

sellProductsRoute.get("/:category/search", async (req, res) => {
  // const { category, description } = req.body;
  const { category } = req.params;
  let search = {
    description: req.query.description,
  };
  console.log(search.description);
  console.log(req.query);
  // try {
  //   const result = await Users.find({
  //     "auctionOff.category": Object.values(category),
  //   });
  //   const filteredData = result.map((x) =>
  //     x.auctionOff.filter(
  //       (y) => y.category === Object.values(category).toString()
  //     )
  //   );
  //   console.log(filteredData);
  // } catch (error) {}
});

sellProductsRoute.get("/profileLoader", async (req, res) => {

});

sellProductsRoute.get("/getCategories", (req, res) => {
  try {
    const categoryList = repo.getCategories();
    res.status(200).json({ success: true, data: categoryList });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Internal sever problem. Try again later." });
  }
});
sellProductsRoute.get("/getCategoryTypes/:category", (req, res) => {
  const { category } = req.params;
  // console.log(category);

  try {
    const listTypes = repo.getCategoryTypes(category);
    if (listTypes) {
      res.status(200).json({
        success: true,
        data: listTypes,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal sever problem. Try again later." });
  }
});

sellProductsRoute.get("/getAllFields", async (req, res) => {
  // const test = repo.createRoute("addProduct","POST","id")
  // const route = await EndPoints.findById('672104f14085435a9ac74eea')

  // console.log(route.product);

  try {
    let data = repo.allFields();
    if (data) {
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: { message: "Internal server problem try again later" },
    });
  }
});

sellProductsRoute.post("/createProduct/:userId", async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  console.log(req.body);
  let obj = {};
  let existingUser;
  // let category = req.query.category;

  try {
    // find user in database and store in variable
    existingUser = await Users.findById(id);
  } catch (err) {
    console.log({ message: err });
  }
  if (!existingUser || existingUser.password !== password) {
    return res.status(401).json({
      success: false,
      data: { message: "Credentials do not match" },
    });
  }
  // try {
  //   // conditional to make sure the req has all required fields
  //   if (
  //     !req.body.title ||
  //     !req.body.category ||
  //     !req.body.bid ||
  //     !req.body.type ||
  //     !req.body.description ||
  //     !req.body.yearBought ||
  //     !req.body.type
  //   ) {
  //     return res.status(400).json({
  //       success: false,
  //       data: { message: "You must fill out all fields." },
  //     });
  //   }

  //   // spread operator to keep existing data when adding new products
  //   existingUser.auctionOff = [...existingUser.auctionOff, newProduct];
  //   // saves the new product to existing user
  //   const savedUser = await existingUser.save();
  //   // a response to let user know that the product has been added successfully
  //   return res
  //     .status(201)
  //     .json({ success: true, data: { message: "Product has been added!" } });
  // } catch (err) {
  //   console.log(err.message);
  //   res.status(500).json({ message: err.message });
  // }
});

export default sellProductsRoute;
