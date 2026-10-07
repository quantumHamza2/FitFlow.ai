function validateEnvironment(env) {
  const missing = ["MONGO_URI", "JWTPRIVATEKEY"].filter(key => !env[key] || !env[key].trim());
  if (missing.length) throw new Error(`Missing configuration: ${missing.join(", ")}`);
  const salt = env.SALT === undefined ? 10 : Number(env.SALT);
  if (!Number.isInteger(salt) || salt < 10 || salt > 14) throw new Error("SALT must be an integer from 10 to 14");
  return salt;
}
module.exports = { validateEnvironment };
