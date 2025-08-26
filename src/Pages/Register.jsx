import React, { useState } from "react";
import { Input } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { sendRegisterData } from "../Services/authServices.js";
import { schema } from "../scheme/registerSchema.js";
import { Link } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },

    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function signUp(userData) {
    setLoading(true);

    const response = await sendRegisterData(userData);
    console.log(userData);
    
    if (response.message) {
      console.log("User registered successfully:", response);
      navigate("/login");
    } else {
      setApiError(response.error);
    }

    setLoading(false);
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl py-10 px-6 min-w-md mx-auto">
      <h1 className="text-2xl mb-6">Register Now!</h1>
      <form className="flex-col flex gap-4" onSubmit={handleSubmit(signUp)}>
        <Input
          isInvalid={Boolean(errors.name)}
          label="Name"
          {...register("name")}
          type="text"
          variant="bordered"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <Input
          isInvalid={Boolean(errors.email && touchedFields.email)}
          label="Email"
          {...register("email")}
          type="email"
          variant="bordered"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input
          isInvalid={Boolean(errors.password && touchedFields.password)}
          label="Password"
          {...register("password")}
          type="password"
          variant="bordered"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Input
          isInvalid={Boolean(errors.rePassword && touchedFields.password)}
          label="Confirm Password"
          {...register("rePassword")}
          type="password"
          variant="bordered"
        />
        {errors.rePassword && (
          <p className="text-red-500 text-sm">{errors.rePassword.message}</p>
        )}

        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <Input
              isInvalid={Boolean(
                errors.dateOfBirth && touchedFields.dateOfBirth
              )}
              label="Date of Birth"
              type="date"
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div className="flex flex-col flex-1">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isInvalid={Boolean(errors.gender && touchedFields.gender)}
                  className="max-w-xs"
                  variant="bordered"
                  label="Select your gender"
                >
                  <SelectItem key="male" value="male">
                    Male
                  </SelectItem>
                  <SelectItem key="female" value="female">
                    Female
                  </SelectItem>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
        </div>

        <Button isLoading={loading} type="submit" className="mt-5">
          Register
        </Button>
        <div>
          {" "}
          If You Have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>{" "}
        </div>
        {apiError && (
          <span className="block text-center text-red-500 t"> {apiError} </span>
        )}
      </form>
    </div>
  );
}
