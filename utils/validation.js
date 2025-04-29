// user.schema.js
const { z } = require("zod");

const validator = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

module.exports = validator ;
