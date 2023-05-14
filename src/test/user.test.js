const request = require("supertest");

const { app } = require("../../index");
// const jwt = require("jsonwebtoken");
// const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// describe("user controller", () => {

//   it("should register a user", async () => {
//     const response = await request(app).post("/api/user/register").send({
//       name: "test",
//       email: "test17@gmail.com",
//       password: "test123",
//     });
//     expect(response.statusCode).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.message).toBe("User created successfully");
//   }, 60000);
// });
describe("Login user", () => {
  it.only("should return a success message and token for valid credentials", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "test11@gmail.com",
      password: "test123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it("should return an error message for invalid email", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "invalid@gmail.com",
      password: "test123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User does not exist");
  });

  it("should return an error message for invalid password", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "test8@gmail.com",
      password: "test1234",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Password is incorrect");
  });
});
