import * as zod from "zod";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is Invalid"
      ),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Invalid Password"
      ),
    rePassword: zod.string().nonempty("Confirm Password is required"),

    dateOfBirth: zod.coerce
      .date()
      .refine((val) => !!val, { message: "Date is required" })
      .refine((value) => {
        const userAge = value.getFullYear();
        const now = new Date().getFullYear();
        const diff = now - userAge;
        return diff >= 18;
      }, "You must be at least 18 years old to register"),

    gender: zod.string().nonempty("Gender is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });
