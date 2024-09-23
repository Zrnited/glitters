"use client";
import Layout from "@/components/layout";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
// import { cookies } from "next/headers";
import { setCookie } from "../action/actions";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface userData {
  email: string;
  password: string;
}

export interface StoredUserData {
  fullName: string;
  email: string;
  password: string;
}

export interface FieldErrors {
  email?: Array<string>;
  password?: Array<string>;
}

const userDataSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Invalid type of password. Password too short" }),
});

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState<userData>({
    email: "",
    password: "",
  });
  const [storedUserData, setStoredUserData] = useState<StoredUserData>();
  const [formError, setFormError] = useState<boolean>(false);
  const [fieldErr, setFieldErr] = useState<FieldErrors>();
  // console.log(form);
  const [showPassword, SetShowPassword] = useState<boolean>(false);
  const [islogged, setIsLogged] = useState<boolean>(false);

  function handleChange(e: any) {
    if (e.target) {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    } else {
      return;
    }
  }

  function getUserData() {
    const getUserDetails = sessionStorage.getItem("userDetails");
    if (getUserDetails) {
      const user: StoredUserData = JSON.parse(getUserDetails);
      setStoredUserData(user);
      console.log("User data parsed from session storage");
    } else {
      console.log("No data found in session storage");
      return;
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const validatedFields = userDataSchema.safeParse({
      email: userData.email,
      password: userData.password,
    });
    const hasErrors = validatedFields.error?.flatten().fieldErrors;
    if (hasErrors) setFieldErr(hasErrors);
    // console.log(validatedFields.error?.flatten().fieldErrors);
    if (!validatedFields.success) {
      return toast.warn("Invalid credentials");
    } else {
      setFieldErr(undefined);
      //check if there is an existing userData
      if (storedUserData) {
        // proceed to check if it matches wrt existing data
        if (
          userData.email === storedUserData?.email &&
          userData.password === storedUserData?.password
        ) {
          //allow access to other page
          toast.success("Login successful");
          setCookie({
            name: "glittersUserToken",
            value: userData.email,
            path: "/",
            secure: true,
          });
          setIsLogged(true);
          // setInterval(() => {
          //   setIsLogged(true);
          // }, 2000);
          router.push("/");
        } else {
          setFormError(true);
        }
      } else {
        //redirect to sign up
        toast.warn("Please sign up first");
        // setInterval(() => {
        //   router.push(`/signup`);
        // }, 2000);
        router.push("/signup");
      }
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <section className="w-full mt-10 pt-14 sm:flex sm:justify-center">
        <div className="flex flex-col gap-y-3 px-5 sm:w-[400px]">
          {/* error state div. Uncomment when needed */}
          {formError && (
            <div className="bg-[#F5A6A7] text-[#960003] flex items-center justify-center h-[49px] md:place-self-center md:w-[312px]">
              <p>Invalid email address or password</p>
            </div>
          )}
          <h1 className="text-4xl text-center font-medium">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <label>Email address</label>
              <input
                placeholder="Enter your email address"
                type="text"
                className={
                  fieldErr?.email === undefined
                    ? "focus:outline-none px-4 h-[55px] border border-[#2E2729]"
                    : "focus:outline-none px-4 h-[55px] border border-red-500"
                }
                name="email"
                onChange={handleChange}
              />
              {fieldErr?.email !== undefined && (
                <p className="text-sm text-red-500">{`${fieldErr?.email[0]}`}</p>
              )}
            </div>
            <div className="relative flex flex-col gap-y-2">
              <label>Password</label>
              <input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                className={
                  fieldErr?.password === undefined
                    ? "focus:outline-none px-4 h-[55px] border border-[#2E2729]"
                    : "focus:outline-none px-4 h-[55px] border border-red-500"
                }
                name="password"
                onChange={handleChange}
              />
              {fieldErr?.password !== undefined && (
                <p className="text-sm text-red-500">{`${fieldErr?.password[0]}`}</p>
              )}
              <i
                onClick={() => SetShowPassword(!showPassword)}
                className="absolute right-5 top-12 cursor-pointer"
              >
                {showPassword ? (
                  <BsEye size={20} color="gray" />
                ) : (
                  <BsEyeSlash size={20} color="gray" />
                )}
              </i>
            </div>
            <button className="h-[55px] bg-[#2E2729] text-white hover:bg-[#2b2426] transition delay-100">
              Sign in to account
            </button>
          </form>
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex flex-col">
              <p>New user?</p>
              <Link
                href={"/signup"}
                className="text-[#CF8292] font-medium hover:underline"
              >
                Create an account
              </Link>
            </div>
            <Link
              href={"/resetpassword"}
              className="text-[#CF8292] font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
