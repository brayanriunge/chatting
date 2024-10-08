"use client";

import Image from "next/image";
import Link from "next/link";
import google from "@/public/google.png";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { useForm } from "react-hook-form";
import { registerUserSchema } from "@/utils/validate";

import Head from "next/head";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
};

export default function RegisterUser() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(registerUserSchema) });

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch("http://localhost:3000/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 409)
        setServerErrors("Email is already registered");

      if (response.status === 500)
        setServerErrors("Server error, try again later");

      if (response.status === 201) {
        router.replace("/login");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Form validate errors:", error.errors);
      }
    }
  }
  //google handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "/" });
  }

  return (
    <>
      <Head>
        <title>Register Page</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" href="/LOGO.png" />
      </Head>
      <div className="flex  bg-custom-gradient gap-16 py-10  min-h-full  mb-0">
        <div className=" bg-slate-50 m-auto my-8 h-3/4 rounded-md mx-auto p-6  max-w-md w-full">
          {/* Login form */}
          <div className=" flex flex-col text-center gap-10 h-full rounded-md">
            <div className="m-auto px-4 py-4">
              <div>
                <h1 className="font-bold text-4xl text-gray-800 font-montserrat py-4">
                  Register
                </h1>
              </div>
              {serverErrors && (
                <div
                  className="mb-4 rounded-lg border border-red-600 bg-red-50 p-4 text-sm text-red-800"
                  role="alert"
                >
                  {serverErrors}
                </div>
              )}
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex border border-gray-400  rounded-md relative">
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="NAME"
                    className={`${
                      errors.name?.message
                        ? `focus:border-red-600`
                        : `focus:border-gray-900`
                    } w-full px-6 py-4 rounded-xl bg-slate-50 focus:outline-none border-none `}
                    {...register("name")}
                  />
                  <span className="icon flex items-center px-4 ">
                    <HiOutlineUser className="h-[25px] w-[25px]" />
                  </span>
                </div>
                {errors.name?.message && (
                  <span className="text-xs text-red-600">
                    {errors.name.message}
                  </span>
                )}
                <div className="flex border border-gray-400  rounded-md relative">
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="EMAIL"
                    className={`${
                      errors.email?.message
                        ? `focus:border-red-600`
                        : `focus:border-gray-900`
                    } w-full px-6 py-4 rounded-xl bg-slate-50 focus:outline-none border-none `}
                    {...register("email")}
                  />
                  <span className="icon flex items-center px-4 ">
                    <HiAtSymbol className="h-[25px] w-[25px]" />
                  </span>
                </div>
                {errors.email?.message && (
                  <span className="text-xs text-red-600">
                    {errors.email.message}
                  </span>
                )}
                <div className="flex border border-gray-400  rounded-md relative">
                  <input
                    type={`${show.password ? "text" : "password"}`}
                    id="password"
                    required
                    placeholder="PASSWORD"
                    className={`${
                      errors.password?.message
                        ? `focus:border-red-600`
                        : `focus:border-gray-900`
                    } w-full px-6 py-4 rounded-xl bg-slate-50 focus:outline-none border-none `}
                    {...register("password")}
                  />
                  <span
                    className="icon flex items-center px-4  "
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  >
                    <HiFingerPrint className="h-[25px] w-[25px]" />
                  </span>
                </div>
                {errors.password?.message && (
                  <span className="text-xs text-red-600">
                    {errors.password.message}
                  </span>
                )}
                <div className="flex border border-gray-400  rounded-md relative">
                  <input
                    type={`${show.cpassword ? "text" : "password"}`}
                    id="cpassword"
                    required
                    placeholder="CONFIRM PASSWORD"
                    className={`${
                      errors.password?.message
                        ? `focus:border-red-600`
                        : `focus:border-gray-900`
                    } w-full px-6 py-4 rounded-xl bg-slate-50 focus:outline-none border-none `}
                    {...register("cpassword")}
                  />
                  <span
                    className="icon flex items-center px-4  "
                    onClick={() =>
                      setShow({ ...show, cpassword: !show.cpassword })
                    }
                  >
                    <HiFingerPrint className="h-[25px] w-[25px]" />
                  </span>
                </div>
                {errors.cpassword?.message && (
                  <span className="text-xs text-red-600">
                    {errors.cpassword.message}
                  </span>
                )}
                <div className="">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 rounded-md to-indigo-500 py-3 text-gray-50 text-lg
                            hover:bg-gradient-to-r  hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 hover:border"
                  >
                    Register
                  </button>
                </div>
                {/* <div className="">
                  <button
                    type="button"
                    onClick={handleGoogleSignin}
                    className="w-full py-3 border flex justify-between items-center gap-4  rounded-lg hover:bg-gray-300"
                  >
                    <p className="text-montserrat ml-2">Sign in with Google</p>
                    <Image
                      src={google}
                      height={30}
                      width={30}
                      alt="google"
                      className="rounded-full"
                    />
                  </button>
                </div> */}
              </form>
              <p>
                Have an account?
                <Link
                  legacyBehavior
                  href={"/login"}
                  className="text-center text-gray-400"
                >
                  <a className="text-blue-700"> Sign In</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
