import { z } from "zod";
import mongoose from "mongoose";

export const validate = (schema) => (req, _res, next) => {
  // console.log(schema.def.shape.body.def.shape);

  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const error = new Error(err.issues.map((i) => i.message).join(", "));
      error.statusCode = 400;
      return next(error);
    }
    next(err);
  }
};

export const objectIdSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => mongoose.isValidObjectId(val), {
      message: "Invalid ID format. Must be a valid MongoDB ObjectId",
    }),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Product name is required" })
      .trim()
      .min(1, "Name cannot be empty"),
    price: z
      .number({ required_error: "Product price is required" })
      .min(0, "Price must be non-negative"),
    description: z.string().optional(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => mongoose.isValidObjectId(val), {
      message: "Invalid ID format. Must be a valid MongoDB ObjectId",
    }),
  }),
  body: z.object({
    name: z.string().trim().min(1, "Name cannot be empty").optional(),
    price: z.number().min(0, "Price must be non-negative").optional(),
    description: z.string().optional(),
  }),
});
