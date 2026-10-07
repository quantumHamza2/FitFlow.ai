const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validateEnvironment } = require("../config/validateEnvironment");
test("missing configuration fails without printing secrets", () => assert.throws(() => validateEnvironment({}), /Missing configuration/));
test("salt defaults safely and rejects invalid costs", () => {
 const base = {MONGO_URI: "mongodb://localhost/demo", JWTPRIVATEKEY: "test-only"};
 assert.equal(validateEnvironment(base), 10);
 for (const SALT of ["", "NaN", "9", "99", "10.5"]) assert.throws(() => validateEnvironment({...base, SALT}), /SALT/);
});
