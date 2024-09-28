// import { products } from "@/utils/Products";
"use client";
import image from "@/assets/images/product2.png";
import { useAppContext } from "@/context";
import Layout from "@/components/layout";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const { orders } = useAppContext();

  return (
    <Layout>
      <section className="px-5 pt-20">
        <div className="py-3">
          <p className="font-medium">
            <Link className="text-[#CF8292]" href={"/"}>
              Home
            </Link>{" "}
            / <span>My Orders</span>
          </p>
          <h1 className="font-medium text-3xl mt-4">Orders Page</h1>
        </div>

        {/* Order's div */}
        {orders.length !== 0 && (
          <div className="border border-[#2E2729] md:flex md:flex-row md: justify-center">
            <div className="p-2 h-auto flex flex-col gap-y-2 w-full">
              {/* cart-item */}
              {orders.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row items-center gap-2 border border-[#2E2729] p-2 lg:h-auto"
                  >
                    <Image
                      alt="cart-img"
                      priority
                      src={item.coverImg ? item.coverImg : image}
                      className="w-[112px] h-[112px] rounded-lg lg:w-[100px] lg:h-[100px]"
                    />
                    <div className="flex flex-col gap-1 justify-between lg:flex lg:flex-row lg:gap-5 lg:items-center">
                      <div>
                        <h1 className="font-semibold text-xl lg:text-2xl">
                          {item.name}
                        </h1>
                        <p className="text-sm lg:text-lg">{item.desc}</p>
                      </div>
                      <div className="flex flex-col md:flex-row md:gap-5 lg:flex-col lg:gap-1">
                        <div className="text-base flex flex-col lg:items-center lg:gap-x-3 lg:flex-row lg:text-lg">
                          <p className="font-semibold">{`Color: ${item.color}`}</p>
                          <p className="font-semibold">{`Qty: ${item.quantity}`}</p>
                        </div>
                        <p className="text-sm text-green-600 md:text-base lg:text-lg">
                          Delivery: Within 7days
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {orders.length === 0 && (
          <div className="h-screen border border-[#2E2729] flex flex-col gap-2 items-center w-full justify-center">
            <h1>Your orders will appear here</h1>
            <Link
              className="h-[50px] text-lg bg-[#2E2729] text-white w-[200px] rounded-sm flex items-center justify-center"
              href={"/"}
            >
              Shop now
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}
