const assert = require("assert");
const request = require("supertest");
const { app } = require("../index");
const userModel = require("../src/models/userModel.js");

describe("Registration API", () => {
  // beforeEach(async () => {
  //   await User.deleteMany({});
  // });
  it("should register new user successfully", async () => {
    const newUser = {
      name: "sandesh",
      email: "test@testerrr.com",
      password: "hacker",
    };
    try {
      const response = await request(app)
        .post("/api/user/register")
        .send(newUser)
        .expect(200);

      assert.strictEqual(response.body.message, "User created successfully");
      assert.strictEqual(response.body.success, true);

      const savedUser = await User.findOne({ email: newUser.email });
      assert.ok(savedUser);
    } catch (error) {
      console.error("Error registering new user:", error);
      throw error;
    }
  }).timeout(50000);
  it("should return an error if there is an error creating the user", async () => {
    // Provide invalid data that causes an error during user creation
    const invalidUser = {
      name: "sandesh",
    };

    const response = await request(app)
      .post("/api/user/register")
      .send(invalidUser)
      .expect(500);

    assert.strictEqual(response.body.message, "Error creating user");
    assert.strictEqual(response.body.success, false);
    assert.ok(response.body.error); // Check if the error is present in the response
  });
});
