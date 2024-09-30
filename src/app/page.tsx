"use client";
import { useEffect, useState } from "react";
import { products } from "@/utils/Products";
import { Products } from "@/components/products/products";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import Aos from 'aos';
import 'aos/dist/aos.css';
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

  const { cart, setCart, setCartToSessionStorage } = useAppContext();
  const router = useRouter();
  const [getProductId, setGetProductId] = useState<number>();

  function setProductId (e: number){
    console.log(e);
    setGetProductId(e);
  }

  useEffect(()=>{
    if(getProductId === undefined){
      return;
    } else {
      router.push(`/product/${getProductId.toString()}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProductId])

  useEffect(()=>{
    Aos.init({
      duration: 1000,
      once: false
    })
  })

  return (
    <Layout>
      <section className="p-5 pt-28 lg:flex lg:flex-col lg:justify-center">
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
            <div className="w-[168px] h-[300px] rounded-xl z-0 md:h-[380px] md:w-[213px] lg:w-[180px] lg:h-[320px] xl:w-[253px] xl:h-[450px]">
              <NextVideo
                className="object-fill bg-cover h-full w-full"
                accentColor="#CF8292"
                src={productVideo}
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
            <h1 data-aos="fade-up" className="text-6xl font-semibold xl:text-[80px]">
              Making every of your{" "}
              <span className="text-[#CF8292]">show up </span>glow.
            </h1>
            <p data-aos="fade-up" className="font-medium xl:text-lg">
              We serve and offer delivery nationwide. You order world class and
              we deliver world class.
            </p>
            <button onClick={(()=>{
              window.scrollTo(0, 1400);
            })} data-aos="fade-up" className="bg-[#2E2729] text-white text-center h-[55px] w-[172px] hover:bg-black transition delay-100 xl:text-lg">
              Show Now
            </button>
          </div>
        </article>
      </section>
      <section className="py-5 px-5">
        <h1 data-aos="fade-up" className="text-center text-3xl font-semibold md:text-4xl lg:text-5xl">
          What you experience shopping with us
        </h1>
        <div data-aos="fade-up" className="py-10 grid grid-cols-2 gap-y-10 place-items-start sm:place-items-center md:grid-cols-4 md:place-items-start lg:gap-y-0 lg:gap-x-8 lg:py-20">
          {experience?.map((exp, index) => {
            return (
              <div
                key={index}
                className="min-w-[150px] max-w-[208px] flex flex-col items-center text-center cursor-pointer z-10 p-2 md:p-3 lg:max-w-[280px] lg:gap-y-4 hover:shadow-md hover:scale-105 hover:bg-[#F1DADF] transition ease-in-out delay-150"
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
                <p className="text-[#746266] text-sm sm:text-base lg:text-lg">{exp.text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <Products setCartToSessionStorage={setCartToSessionStorage} cartArray={cart} setCartArray={setCart} productsData={products} setProductId={setProductId}/>
    </Layout>
  );
}
