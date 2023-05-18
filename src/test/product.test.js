const request = require("supertest");

const app = require("../app.js");
const Product = require("../models/product.js");
const User = require('../models/user.js')

const { addUser } = require('./fixture/initiateData.js')

describe("Product Flow", () => {
  let dataUser;
  let dataProduct;

  beforeAll(async () => {
    const data = await addUser()
    dataUser = data
  })

  it("Add Product", async () => {
    const response = await request(app)
      .post("/product")
      .set("Authorization", dataUser.token)
      .send({
        name: "Test Product",
        price: 100000,
        description: "Test Product Description",
        stock: 10,
      })
      .expect(200);

    dataProduct = response.body

    expect(response.body).toMatchObject({
      name: expect.any(String),
      _id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
      stock: expect.any(Number),
      favoriteBy: expect.any(Array),
      comment: expect.any(Array),
    });
  });

  it("Get Product", async() => {
    const response = await request(app)
      .get('/product')
      .set("Authorization", dataUser.token)
      .expect(200)
    
    expect(response.body.docs[0]).toMatchObject({
      name: expect.any(String),
      _id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
      stock: expect.any(Number),
      favoriteBy: expect.any(Array),
      comment: expect.any(Array),
    })
  })

  it("Search product not found", async() => {
    const response = await request(app)
      .get('/product?keyword=Nike')
      .set("Authorization", dataUser.token)
      .expect(200)

    expect(response.body.docs).not.toHaveLength(1)
  })

  it("Favorite product", async() => {
    const response = await request(app)
      .patch(`/product/favorite?userId=${dataUser._id}&productId=${dataProduct._id}`)
      .set("Authorization", dataUser.token)
      .expect(200)

    expect(response.body.favoriteBy[0]).toMatchObject({
      _id: expect.any(String),
      name: expect.any(String),
    })
  })

  it("Comment product", async() => {
    const response = await request(app)
      .patch('/product/comment')
      .set("Authorization", dataUser.token)
      .send({
        productId: dataProduct._id,
        userId: dataUser._id,
        text: "Test Comment",
        rating: 5
      })
      .expect(200)

    expect(response.body.comment[0]).toMatchObject({
      _id: expect.any(String),
      text: expect.any(String),
      rating: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      commentBy: expect.any(Object),
    })
  })

  afterAll(async () => {
    await Product.collection.drop();
    await User.collection.drop();
  });
});

