const assert = require("assert");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const { register } = require("../controller/hotelController");
describe("User Registration", function () {
  it("should be register a user", async function () {
    const req = {
      body: {
        email: "tester@gmail.com",
        password: "tester",
      },
    };
    // create fake response object with a status function that returns itself
    const res = {
      status: function (statusCode) {
        assert.strictEqual(statusCode, 200);
        return this;
      },
      send: function (data) {
        assert.strictEqual(data.message, "User created successfully");
        assert.strictEqual(data.success, true);
        return this;
      },
    };
    try {
      await register(req, res);
      const user = await userModel.findOne({ email: email });
      assert.ok(user);
      // check if password is hashed
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      assert.strictEqual(isPasswordValid, true);
    } catch (error) {
      throw new Error("Test failed");
    }
  });
});
