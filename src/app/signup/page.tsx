"use client";
import { z } from "zod";
import Layout from "@/components/layout";
import Link from "next/link";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export interface userData {
  fullName: string;
  email: string;
  password: string;
}

export interface FieldErrors {
  fullName?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
}

const userDataSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name empty or too short" })
    .max(50, { message: "Name is too long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(20, { message: "password is too long" }),
});

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState<userData>({
    fullName: "",
    email: "",
    password: "",
  });
  // console.log(userData);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [fieldErr, setFieldErr] = useState<FieldErrors>();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  // if(isLogged){
  //   router.push(`/signin`);
  // }

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

  function setToStorage() {
    //set data to session storage
    sessionStorage.setItem("userDetails", JSON.stringify(userData));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const validatedFields = userDataSchema.safeParse({
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
    });
    const hasErrors = validatedFields.error?.flatten().fieldErrors;
    if (hasErrors) setFieldErr(hasErrors);
    if (!validatedFields.success) {
      // toast.warn("Invalid credentials");
    } else {
      setToStorage();
      setUserCreated(true);
      router.push("/signin");
    }
  }

  return (
    <Layout>
      <section className="w-full mt-10 pt-16 sm:flex sm:justify-center">
        <div className="flex flex-col gap-y-3 px-5 sm:w-[400px]">
          {/* error state div. Uncomment when needed */}
          {userCreated && (
            <div className="bg-green-500 text-white flex items-center justify-center h-[49px] md:place-self-center md:w-[312px]">
              <p>Account created successfully!</p>
            </div>
          )}
          <h1 className="text-4xl text-center font-medium">
            Create an account
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <label>Full Name</label>
              <input
                placeholder="Enter your full name"
                type="text"
                className={fieldErr?.fullName === undefined ? "focus:outline-none px-4 h-[55px] border border-[#2E2729]" : "focus:outline-none px-4 h-[55px] border border-red-500"}
                name="fullName"
                onChange={handleChange}
              />
              {fieldErr?.fullName !== undefined && (
                <p className="text-sm text-red-500">{`${fieldErr?.fullName[0]}`}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Email address</label>
              <input
                placeholder="Enter your email address"
                type="text"
                className={fieldErr?.email === undefined ? "focus:outline-none px-4 h-[55px] border border-[#2E2729]" : "focus:outline-none px-4 h-[55px] border border-red-500"}
                name="email"
                onChange={handleChange}
              />
            </div>
            {fieldErr?.email !== undefined && (
              <p className="text-sm text-red-500">{`${fieldErr?.email[0]}`}</p>
            )}
            <div className="relative flex flex-col gap-y-2">
              <label>Password</label>
              <input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                className={fieldErr?.password === undefined ? "focus:outline-none px-4 h-[55px] border border-[#2E2729]" : "focus:outline-none px-4 h-[55px] border border-red-500"}
                name="password"
                onChange={handleChange}
              />
              {fieldErr?.password !== undefined && (
                <p className="text-sm text-red-500">{`${fieldErr?.password[0]}`}</p>
              )}
              <i
                onClick={() => setShowPassword(!showPassword)}
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
              Sign up
            </button>
          </form>
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex flex-col">
              <p>Already have an account?</p>
              <Link
                href={"/signin"}
                className="text-[#CF8292] font-medium hover:underline"
              >
                Sign in
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
