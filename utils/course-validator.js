const { z } =require("zod");

const courseVlidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  imageUrl: z.string().url("Invalid image URL"),
});

module.exports = courseVlidator;
