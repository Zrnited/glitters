import { StaticImageData } from "next/image";
import Image from "next/image";
import { useState } from "react";
// import { Dispatch, SetStateAction } from "react";

export interface ProductsProps {
  productsData: {
    id: number;
    coverImg: StaticImageData;
    fullImg: StaticImageData;
    name: string;
    desc: string;
    about: string;
    price: number;
    status: string;
    category: string;
    color: string;
  }[];
  setProductId(e: number): void;
  // setGetProductId: Dispatch<SetStateAction<number | undefined>>
}

export function Products({ productsData, setProductId }: ProductsProps) {

  const [currentGroup, setCurrentGroup] = useState<string>("");
  
  return (
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
        {productsData?.map((prod, index) => {
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
                    <h3 className="font-semibold md:text-3xl">{`N${(prod.price).toLocaleString(undefined, {maximumFractionDigits:2})}`}</h3>
                    <p className="text-[10px] text-white bg-[#00A460] px-1 md:text-sm">
                      {prod.status}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-0.5 md:mt-7">
                  <button
                    onClick={()=>{
                      const curr = prod;
                      
                      //set to sessionStorage
                      sessionStorage.setItem('currProduct', JSON.stringify(curr));

                      //send ID to pathname
                      setProductId(prod.id);
                    }}
                    className="h-[25px] bg-[#2E2729] text-white text-sm text-center px-2 md:text-lg sm:h-[35px] sm:w-[115px] md:h-[55px] md:w-[188px]"
                  >
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
  );
}
