const request = require("supertest");

const app = require("../app.js");
const User = require('../models/user.js')

const { addUser } = require('./fixture/initiateData.js')

describe("User Auth Flow", () => {
  it("Register", async () => {
    const response = await addUser()
    
    expect(response).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      token: expect.any(String),
    })
  });
  
  it("Login", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@gmail.com",
      password: "123123",
    }).expect(200)
    
    expect(response.body).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      _id: expect.any(String),
      token: expect.any(String),
      refreshToken: expect.any(String),
    })
  });
  
  afterAll(async () => {
    await User.collection.drop();
  });
})


