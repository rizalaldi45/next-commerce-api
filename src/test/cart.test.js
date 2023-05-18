const request = require("supertest");

const app = require("../app.js");
const Product = require("../models/product.js");
const User = require("../models/user.js");
const Cart = require('../models/cart.js')

const { addUser, addProduct } = require("./fixture/initiateData.js");

describe("Cart Flow", () => {
  let dataUser;
  let dataProduct;

  beforeAll(async () => {
    const user = await addUser();
    dataUser = user;

    if (user) {
      const product = await addProduct();
      dataProduct = product;
    }
  });

  it("Add cart", async () => {
    const response = await request(app)
      .post("/cart")
      .set("Authorization", dataUser.token)
      .send({
        product: dataProduct._id,
        user: dataUser._id,
      })
      .expect(200);

    expect(response.body).toMatchObject({
      user: expect.any(String),
      product: expect.any(String),
      quantity: expect.any(Number),
      _id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("Get Cart", async () => {
    const response = await request(app)
        .get(`/cart?userId=${dataUser._id}`)
        .set("Authorization", dataUser.token)
        .expect(200)
    
    expect(response.body.docs[0]).toMatchObject({
        _id: expect.any(String),
        user: expect.any(Object),
        product: expect.any(Object),
        quantity: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
    })
  })

  afterAll(async () => {
    await User.collection.drop();
    await Product.collection.drop();
    await Cart.collection.drop();
  });
});
