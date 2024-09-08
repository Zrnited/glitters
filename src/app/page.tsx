"use client";
import { useState } from "react";
import { products } from "@/utils/Products";
import Image from "next/image";
import Layout from "@/components/layout";
import NextVideo from "next-video";
import productVideo from "../../videos/product.mp4";
import heroimage2 from "@/assets/images/heroImg-2.png";
import heroimage3 from "@/assets/images/heroImg-3.png";
import fastDelivery from "@/assets/icons/fastdelivery.png";
import customerCare from "@/assets/icons/customercare.png";
import professionalism from "@/assets/icons/professional.png";
import topLadies from "@/assets/icons/people.png";

export default function Home() {
  const experience = [
    {
      img: fastDelivery,
      heading: "Fast Delivery",
      text: "Get your orders delivered swiftly, right when you need them.",
    },
    {
      img: customerCare,
      heading: "Excellent Customer Care",
      text: "Our dedicated team ensures your satisfaction with every interaction.",
    },
    {
      img: professionalism,
      heading: "Professionalism & Craft",
      text: "Expertly crafted services with a commitment to excellence.",
    },
    {
      img: topLadies,
      heading: "Access to a Top Ladies Community",
      text: "Join a vibrant network if empowered women, exclusive to our members.",
    },
  ];

  const [currentGroup, setCurrentGroup] = useState<string>("");
  const [getProductId, setGetProductId] = useState<number>();

  function setProductId (e: number){
    console.log(e);
  }

  return (
    <Layout>
      <section className="p-5 lg:flex lg:flex-col lg:justify-center">
        <div className="bg-[#E8C3CB] border border-black rounded-xl py-1 px-4 text-center lg:place-self-center lg:px-3 lg:max-w-[629px]">
          <p className="text-sm">
            We&apos;re giving 20% discount for our first 1,000 orders. Use Code{" "}
            <span className="font-bold">FIRST1K </span>to get the discount in
            your order.
          </p>
        </div>
        <article className="py-10 flex flex-col gap-y-10 sm:justify-center sm:items-center lg:flex-row-reverse gap-x-6 xl:items-start">
          {/* carousel div */}
          <div className="flex flex-row gap-x-3 overflow-scroll activity sm:overflow-hidden md:justify-center md:w-full md:gap-x-6 lg:w-3/4">
            {/* video div */}
            <div className="w-[168px] h-[300px] rounded-xl md:h-[380px] md:w-[213px] lg:w-[180px] lg:h-[320px] xl:w-[253px] xl:h-[450px]">
              <NextVideo
                className="object-fill bg-cover h-full w-full"
                accentColor="#CF8292"
                src={productVideo}
                // playbackId="zjrRzADAASQh00XbS00zcE6vwVnirRdbVWi017yP2l02iuw"
              />
            </div>
            <Image
              src={heroimage2}
              priority
              alt="img"
              className="w-[168px] h-[300px] rounded-xl md:h-[380px] md:w-[213px] lg:w-[180px] lg:h-[320px] xl:w-[253px] xl:h-[450px]"
            />
            <Image
              src={heroimage3}
              priority
              alt="img"
              className="w-[168px] h-[300px] rounded-xl md:h-[380px] md:w-[213px] lg:w-[180px] lg:h-[320px] xl:w-[253px] xl:h-[450px]"
            />
          </div>

          {/* info div */}
          <div className="flex flex-col gap-4 lg:w-[460px]">
            <h1 className="text-6xl font-semibold xl:text-[80px]">
              Making every of your{" "}
              <span className="text-[#CF8292]">show up </span>glow.
            </h1>
            <p className="font-medium xl:text-lg">
              We serve and offer delivery nationwide. You order world class and
              we deliver world class.
            </p>
            <button className="bg-[#2E2729] text-white text-center h-[55px] w-[172px] hover:bg-black transition delay-100 xl:text-lg">
              Show Now
            </button>
          </div>
        </article>
      </section>
      <section className="py-5 px-5">
        <h1 className="text-center text-3xl font-semibold md:text-4xl lg:text-5xl">
          What you experience shopping with us
        </h1>
        <div className="py-10 grid grid-cols-2 gap-y-10 place-items-start sm:place-items-center md:grid-cols-4 md:place-items-start lg:gap-y-0 lg:gap-x-8 lg:py-20">
          {experience?.map((exp, index) => {
            return (
              <div
                key={index}
                className="min-w-[150px] max-w-[208px] flex flex-col items-center text-center cursor-pointer lg:max-w-[280px] lg:gap-y-4 lg:p-3 hover:shadow-md hover:scale-105 hover:bg-[#F1DADF] transition ease-in-out delay-150"
              >
                <div className="h-[100px] w-[100px] bg-[#F1DADF] rounded-md flex items-center justify-center">
                  <Image
                    src={exp.img}
                    alt="icon"
                    priority
                    className="w-1/2 h-1/2"
                  />
                </div>
                <h3 className="font-medium text-xl mt-2 lg:text-2xl">
                  {exp.heading}
                </h3>
                <p className="text-[#746266] lg:text-lg">{exp.text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="pt-10 pb-10 px-5 lg:pt-0 lg:pb-10 xl:px-2">
        <h1 className="text-center text-3xl font-semibold md:text-4xl lg:text-5xl">
          Explore our cutesy products
        </h1>
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-row justify-center gap-5 font-semibold text-lg my-7 border-b border-black lg:max-w-[400px] lg:place-self-center">
            <div className="flex flex-col gap-y-1">
              <p
                onClick={(e: any) => {
                  // console.log(e.target.innerHTML);
                  const group = e.target.innerHTML;
                  setCurrentGroup(group);
                }}
                className="cursor-pointer"
              >
                Bags
              </p>
              {(currentGroup === "Bags" || currentGroup === "") && (
                <span className="bg-black h-[5px] rounded-sm"></span>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <p
                onClick={(e: any) => {
                  // console.log(e.target.innerHTML);
                  const group = e.target.innerHTML;
                  setCurrentGroup(group);
                }}
                className="cursor-pointer"
              >
                Beadwares
              </p>
              {currentGroup === "Beadwares" && (
                <span className="bg-black h-[5px] rounded-sm"></span>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <p
                onClick={(e: any) => {
                  // console.log(e.target.innerHTML);
                  const group = e.target.innerHTML;
                  setCurrentGroup(group);
                }}
                className="cursor-pointer"
              >
                Partners Products
              </p>
              {currentGroup === "Partners Products" && (
                <span className="bg-black h-[5px] rounded-sm"></span>
              )}
            </div>
          </div>
        </div>
        {/* Products display section */}
        <article className="grid grid-cols-1 gap-y-5 justify-center place-items-center sm:grid-cols-2 sm:gap-y-8 sm:gap-x-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {products?.map((prod, index) => {
            return (
              <div
                key={index}
                className="h-[244px] w-[190px] bg-[#E8C3CB] border border-black relative sm:h-[300px] sm:w-[246px] md:h-[480px] md:w-[407px]"
              >
                <div className="absolute -right-2 -bottom-2 border border-black bg-white h-[244px] w-[190px] p-1 sm:h-[300px] sm:w-[246px] md:h-[480px] md:w-[407px] md:p-2">
                  <Image
                    src={prod.coverImg}
                    priority
                    alt="product"
                    className="w-full h-[138px] sm:h-[185px] md:h-[305px]"
                  />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mt-2">
                    <div>
                      <h2 className="text-xl font-semibold md:text-3xl">
                        {prod.name}
                      </h2>
                      <p className="text-xs font-medium md:text-lg">
                        {prod.desc}
                      </p>
                    </div>
                    <div className="flex flex-row gap-x-1 items-center md:flex-col md:items-end">
                      <h3 className="font-semibold md:text-3xl">{`N${prod.price}`}</h3>
                      <p className="text-[10px] text-white bg-[#00A460] px-1 md:text-sm">
                        {prod.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center mt-0.5 md:mt-7">
                    <button onClick={()=>setProductId(prod.id)} className="h-[25px] bg-[#2E2729] text-white text-sm text-center px-2 md:text-lg sm:h-[35px] sm:w-[115px] md:h-[55px] md:w-[188px]">
                      Shop Now
                    </button>
                    <button className="h-[25px] bg-white text-[#2E2729] border-[#2E2729] border text-sm text-center px-2 font-semibold sm:h-[35px] sm:w-[115px] md:text-lg md:h-[55px] md:w-[188px]">
                      Add to Cart +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </article>
      </section>
    </Layout>
  );
}
