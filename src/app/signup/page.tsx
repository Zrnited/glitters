import Layout from "@/components/layout";
import Link from "next/link";
import { BsEye } from "react-icons/bs";

export default function Page() {
  return (
    <Layout>
      <section className="w-full mt-10 sm:flex sm:justify-center">
        <div className="flex flex-col gap-y-3 px-5 sm:w-[400px]">
          {/* error state div. Uncomment when needed */}
          {/* <div className="bg-[#F5A6A7] text-[#960003] flex items-center justify-center h-[49px] md:place-self-center md:w-[312px]">
            <p>Invalid email address or password</p>
          </div> */}
          <h1 className="text-4xl text-center font-medium">Create an account</h1>
          <form className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <label>Full Name</label>
              <input
                placeholder="Enter your full name"
                type="text"
                className="focus:outline-none px-4 h-[55px] border border-[#2E2729]"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Email address</label>
              <input
                placeholder="Enter your email address"
                type="email"
                className="focus:outline-none px-4 h-[55px] border border-[#2E2729]"
              />
            </div>
            <div className="relative flex flex-col gap-y-2">
              <label>Password</label>
              <input
                placeholder="Enter your password"
                type="text"
                className="focus:outline-none px-4 h-[55px] border border-[#2E2729]"
              />
              <i className="absolute right-5 top-12 cursor-pointer">
                <BsEye size={20} color="gray" />
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
