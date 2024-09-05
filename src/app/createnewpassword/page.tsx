import Layout from "@/components/layout";
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
          <h1 className="text-4xl text-center font-medium">Password reset</h1>
          <form className="flex flex-col gap-y-5">
            <div className="relative flex flex-col gap-y-2">
              <label>New password</label>
              <input
                placeholder="Enter your new password"
                type="password"
                className="focus:outline-none px-4 h-[55px] border border-[#2E2729]"
              />
              <i className="absolute right-5 top-12 cursor-pointer">
                <BsEye size={20} color="gray" />
              </i>
            </div>
            <div className="relative flex flex-col gap-y-2">
              <label>Confirm password</label>
              <input
                placeholder="Confirm password"
                type="password"
                className="focus:outline-none px-4 h-[55px] border border-[#2E2729]"
              />
              <i className="absolute right-5 top-12 cursor-pointer">
                <BsEye size={20} color="gray" />
              </i>
            </div>
            <button className="h-[55px] bg-[#2E2729] text-white hover:bg-[#2b2426] transition delay-100">
              Reset password
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
