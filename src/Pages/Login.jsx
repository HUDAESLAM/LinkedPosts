import React, { useContext, useState } from "react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../scheme/loginSchema";
import { sendLoginData } from "../Services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function signIn(userData) {
    setLoading(true);

    const response = await sendLoginData(userData);

    if (response.message) {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(response.token);
      navigate("/");
    } else {
      setApiError(response.error);
    }

    setLoading(false);
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl py-10 px-6 min-w-md mx-auto">
      <h1 className="text-2xl mb-6 text-center">Login Now!</h1>
      <form className="flex-col flex gap-4" onSubmit={handleSubmit(signIn)}>
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

        <Button isLoading={loading} type="submit" className="mt-5">
          Login
        </Button>
        <div>
          {" "}
          If You Haven't an account? please{" "}
          <Link to="/register" className="text-blue-600">
            SignUp
          </Link>{" "}
        </div>
        {apiError && (
          <span className="block text-center text-red-500">{apiError}</span>
        )}
      </form>
    </div>
  );
}
