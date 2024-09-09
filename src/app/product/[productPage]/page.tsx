import Layout from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/utils/Products";
import { Products } from "@/components/products/products";
import fullProdImg from "@/assets/images/product3-2.png";
import vector1 from "@/assets/icons/vector-1.png";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Page() {
  return (
    <Layout>
      <section className="px-5 py-5">
        <div className="bg-[#E8C3CB] border border-black rounded-xl py-1 px-4 text-center sm:hidden">
          <p className="text-sm">
            We&apos;re giving 20% discount for our first 1,000 orders. Use Code{" "}
            <span className="font-bold">FIRST1K </span>to get the discount in
            your order.
          </p>
        </div>
        <div className="mt-5 mb-2">
          <h1 className="font-medium text-lg text-[#CF8292]"> <Link className="hover:underline" href={'/'}>Home </Link>
            <span className="text-black">/</span>{" "}
            <span className="text-gray-400">Product</span>
          </h1>
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="w-full sm:w-[400px]">
            <Image
              className="w-full h-auto"
              alt="product-img"
              priority
              src={fullProdImg}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="hidden bg-[#E8C3CB] border border-black rounded-xl py-1 px-4 text-center sm:flex">
              <p className="text-sm">
                We&apos;re giving 20% discount for our first 1,000 orders. Use
                Code <span className="font-bold">FIRST1K </span>to get the
                discount in your order.
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-medium">Purple fur bag</h1>
                <p className="text-lg">Our bestselling fur bag so far</p>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-3xl font-medium">N39,000</h1>
                <p className="text-sm bg-[#00A460] px-2 text-white">
                  Available
                </p>
              </div>
            </div>
            <p className="text-xl">
              Step into luxury with our bestselling Purple Fur Bag. Crafted from
              the softest faux fur, this chic accessory is a perfect blend of
              style and comfort. Its rich purple hue adds a pop of color to any
              outfit, making it a versatile statement piece for day or night.
              Spacious enough to carry your essentials, yet compact enough to
              stay effortlessly elegant, this bag is designed for those who love
              to stand out. Whether you’re heading to a casual brunch or a
              glamorous evening out, the Purple Fur Bag is your go-to for adding
              a touch of opulence to your look.
            </p>
            <button className="h-[55px] w-[140px] border border-[#2E2729] font-semibold text-[#2E2729] hover:bg-[#2E2729] hover:text-white transition delay-75 ease-in-out cursor-pointer">
              Add to Cart +
            </button>
            <div className="py-5 flex flex-row items-center gap-x-2">
              <div className="flex flex-row gap-x-1 items-center">
                <Image src={vector1} priority alt="vector" className="h-[30px] w-[34px]"/>
                <p className="underline text-sm font-medium">Pick another color choice</p>
              </div>
              {/* <Image src={vector2} alt="vector" priority className="h-[32px]" /> */}
              <span className=" border-none w-[1px] h-[32px] bg-black"></span>
              <div className="flex flex-row gap-x-1 items-center">
                <p className="text-sm font-medium">New chosen color</p>
                <i><IoIosArrowRoundForward /></i>
                <span className="bg-[#FB1CBF] h-[30px] w-[34px]"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-5">
        
      </section>
    </Layout>
  );
}
