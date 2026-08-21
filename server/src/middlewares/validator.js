import { z } from "zod";
import mongoose from "mongoose";

export const validate = (schema) => (req, _res, next) => {
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

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "enter name" })
      .trim()
      .min(2, "use minimum 2 characters"),
    email: z
      .string({ required_error: "enter email" })
      .trim()
      .email("enter valid email format"),
    password: z
      .string({ required_error: "enter password" })
      .min(6, "password must be 6 characters long"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "enter email" })
      .trim()
      .email("enter valid email format"),
    password: z
      .string({ required_error: "enter password" })
      .min(1, "password cannot be empty"),
  }),
});
