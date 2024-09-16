import Layout from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import cartImg from "@/assets/images/cart-img.png";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

export default function Page() {
  return (
    <Layout>
      <section className="px-5">
        <div className="py-3">
          <p className="font-medium">
            <Link className="text-[#CF8292]" href={"/cart"}>
              Store
            </Link>{" "}
            / <span>Cart</span>
          </p>
          <h1 className="font-medium text-3xl mt-4">Cart Page</h1>
        </div>

        {/* Cart section */}
        <div className="border border-[#2E2729] md:flex md:flex-row">
          {/* cart div */}
          <div className="p-2 h-auto flex flex-col gap-y-2 md:w-3/4">
            <div className="flex flex-row items-center gap-2 border border-[#2E2729] p-2 lg:h-auto">
              <Image
                alt="cart-img"
                priority
                src={cartImg}
                className="w-[112px] h-[112px] lg:w-[80px] lg:h-[80px]"
              />
              <div className="lg:flex lg:flex-row lg:gap-x-5 lg:items-center">
                <div>
                  <h1 className="font-medium text-xl lg:text-2xl">
                    Purple fur bag
                  </h1>
                  <p className="text-sm lg:text-lg">
                    Our bestselling fur bag so far
                  </p>
                </div>
                <div className="lg:hidden">
                  <div className="flex flex-row gap-5 text-sm">
                    <p>N50,000</p>
                    <p>Purple</p>
                  </div>
                  <div className="flex flex-row gap-x-1">
                    <button className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]">
                      <BsChevronUp color="white" size={20} />
                    </button>

                    <span className="w-[48px] h-[38px] border border-[#2E2729] font-semibold text-lg flex justify-center items-center">
                      4
                    </span>

                    <button className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]">
                      <BsChevronDown color="white" size={20} />
                    </button>
                  </div>
                </div>
                <div className="hidden lg:flex lg:items-center lg:gap-x-3 lg:flex-col xl:ml-5 xl:flex-row">
                  <p className="text-lg">Purple</p>
                  <div className="flex flex-row gap-x-2">
                    <span className="w-[48px] h-[38px] border border-[#2E2729] font-semibold text-lg flex justify-center items-center">
                      4
                    </span>

                    <button className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]">
                      <BsChevronUp color="white" size={20} />
                    </button>

                    <button className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]">
                      <BsChevronDown color="white" size={20} />
                    </button>
                  </div>
                  <p className="text-lg">N50,000</p>
                </div>
              </div>
            </div>

            {/* color selection */}
            <div className="flex flex-row items-center gap-2 border border-[#2E2729] p-2 lg:h-auto">
              <Image
                alt="cart-img"
                priority
                src={cartImg}
                className="w-[112px] h-[112px] lg:w-[80px] lg:h-[80px]"
              />
              <div className="lg:flex lg:flex-row lg:gap-x-5 lg:items-center">
                <div>
                  <h1 className="font-medium text-xl lg:text-2xl">
                    Purple fur bag
                  </h1>
                  <p className="text-sm lg:text-lg">
                    Our bestselling fur bag so far
                  </p>
                </div>
                <div className="lg:hidden">
                  <div className="flex flex-row gap-5 text-sm">
                    <p>N50,000</p>
                    <div className="flex flex-row items-center gap-x-1">
                      <p>Color</p>
                      <span className="bg-[#FB1CBF] h-[15px] w-[60px]"></span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-1">
                    <button className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]">
                      <BsChevronUp color="white" size={20} />
                    </button>

                    <span className="w-[48px] h-[38px] border border-[#2E2729] font-semibold text-lg flex justify-center items-center">
                      4
                    </span>

                    <button className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]">
                      <BsChevronDown color="white" size={20} />
                    </button>
                  </div>
                </div>
                <div className="hidden lg:flex lg:items-center lg:gap-x-3 lg:flex-col xl:ml-5 xl:flex-row">
                  <div className="flex flex-row gap-1 justify-center items-center xl:items-start xl:flex-col">
                    <p>Choice color</p>
                    <span className="bg-[#FB1CBF] mb-2 h-[20px] w-[60px] xl:w-[91px]"></span>
                  </div>
                  <div className="flex flex-row gap-x-2">
                    <span className="w-[48px] h-[38px] border border-[#2E2729] font-semibold text-lg flex justify-center items-center">
                      4
                    </span>

                    <button className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]">
                      <BsChevronUp color="white" size={20} />
                    </button>

                    <button className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]">
                      <BsChevronDown color="white" size={20} />
                    </button>
                  </div>
                  <p className="text-lg">N50,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order div */}
          <div className="md:border-l border-[#2E2729] md:w-1/2">
            <div className="md:w-full p-3">
              <form className="flex flex-col gap-y-3">
                <h2 className="text-2xl font-medium">Complete Order</h2>
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-col gap-y-1">
                    <label className="font-semibold">Delivery Address</label>
                    <input
                      type="text"
                      className="h-[60px] border border-[#2E2729] px-5 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label className="font-semibold">
                      WhatsApp/Contact Number
                    </label>
                    <input
                      type="text"
                      className="h-[60px] border border-[#2E2729] px-5 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="font-semibold">Other comments</label>
                  <input
                    type="text"
                    className="h-[60px] border border-[#2E2729] px-5 focus:outline-none"
                  />
                </div>
                <button className="w-[188px] h-[55px] text-lg bg-[#2E2729] text-white mt-2">
                  Complete Payment
                </button>
              </form>
              {/* Paystack div */}
              <div className="h-[370px] flex items-center justify-center italic border border-[#2E2729] mt-5">
                Payment confirmation loading...
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
