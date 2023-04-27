const request = require("supertest");

const { app } = require("../../index");
// const jwt = require("jsonwebtoken");
// const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("hotelController", () => {
  let token;

  beforeAll(async () => {
    // login user and get token
    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "test6@gmail.com", password: "test123" });
    token = response.body.token;
  }, 60000);
  it("Test for Hotel registration for authenticated user", async () => {
    const response = await request(app)
      .post("/api/hotel/register")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test12",
        address: "Gharipatan,Pokhara 17",
        phoneNumber: "123456",
        website: "http://www.example.com/hotel",
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hotel registered sucessfully");
    expect(response.body.data.name).toBe("test12");
    expect(response.body.data.address).toBe("Gharipatan,Pokhara 17"),
      expect(response.body.data.phoneNumber).toBe("123456"),
      expect(response.body.data.website).toBe("http://www.example.com/hotel");
  });
  it("returns an error if the hotel already exists", async () => {
    const response = await request(app)
      .post("/api/hotel/register")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test12",
        address: "Gharipatan,Pokhara 17",
        phoneNumber: "123456",
        website: "http://www.example.com/hotel",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hotel already exists");
    expect(response.body.data).toBeUndefined();
  });
  it("returns an error if the user is not authenticated", async () => {
    const response = await request(app).post("/api/hotel/register").send({
      name: "Test Hotel",
      address: "123 Main St.",
      phoneNumber: "555-1234",
      website: "http://www.example.com/hotel",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Auth failed");
    expect(response.body.data).toBeUndefined();
  });
});
