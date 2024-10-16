import { StaticImageData } from "next/image";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { products } from "@/utils/Products";
import LoadingState from "../loader/loader";

interface Products {
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
}[]

export interface cartObjects {
  id?: number;
  coverImg?: StaticImageData;
  fullImg?: StaticImageData;
  name?: string;
  desc?: string;
  about?: string;
  price?: number;
  status?: string;
  category?: string;
  color?: string;
  quantity?: number;
}

export interface ProductsProps {
  // productsData: {
  //   id: number;
  //   coverImg: StaticImageData;
  //   fullImg: StaticImageData;
  //   name: string;
  //   desc: string;
  //   about: string;
  //   price: number;
  //   status: string;
  //   category: string;
  //   color: string;
  // }[];
  setProductId(e: number): void;
  setCartArray: Dispatch<SetStateAction<object[]>>;
  cartArray: cartObjects[];
  setCartToSessionStorage(cartItems: object[]): void;
  // setGetProductId: Dispatch<SetStateAction<number | undefined>>
}

export interface productItem {
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
  quantity?: number;
}

export function Products({
  setProductId,
  setCartArray,
  cartArray,
  setCartToSessionStorage,
}: ProductsProps) {
  const [currentGroup, setCurrentGroup] = useState<string>("");
  const [check, setCheck] = useState<number>(0);
  const [loadState, setLoadState] = useState<boolean>(true);
  const [prodsArr, setProdsArr] = useState<Array<Products>>(products);

  function pushProductToCart(productItem: productItem) {
    //find
    const item = cartArray?.find((item) => item?.id === productItem.id);

    //if found, ignore cos it's already there
    if (item) {
      //toast notify already there.
      toast.warn("Item already added to cart");
      return;
    } else {
      //add and toast notify of addition
      const selectedProduct = {
        id: productItem.id,
        coverImg: productItem.coverImg,
        fullImg: productItem.fullImg,
        name: productItem.name,
        desc: productItem.desc,
        about: productItem.about,
        price: productItem.price,
        status: productItem.status,
        category: productItem.category,
        color: productItem.color,
        quantity: 1,
      };
      setCartArray((prevState) => {
        return [...prevState, selectedProduct];
      });
      toast.success("Item added to cart successfully");
    }
    setCheck(check + 1);
  }

  function setLoad() {
    setInterval(() => {
      setLoadState(false);
    }, 3000);
  }

  function changeProdArr (e: any){
    // console.log(e.target.innerHTML);
    const group = e.target.innerHTML;
    // console.log(group);
    setCurrentGroup(group);
    setLoadState(true);
    // toast.warn("Beadwares currently not available");
    if(group === "Bags"){
      setLoad();
      setProdsArr(products);
    } else if (group === "Beadwares"){
      setLoad();
      setProdsArr(products);
    } else {
      setCurrentGroup("Bags")
      return toast.warn("Partners Products not available");
    }
  }

  useEffect(() => {
    if (check === 0) {
      return;
    } else {
      setCartToSessionStorage(cartArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  useEffect(() => {
    setLoad();
  }, []);

  return (
    <section
      id="products"
      className="pt-10 pb-10 px-5 lg:pt-0 lg:pb-10 xl:px-2"
    >
      <h1
        data-aos="fade-up"
        className="text-center text-3xl font-semibold md:text-4xl lg:text-5xl"
      >
        Explore our cutesy products
      </h1>
      <div data-aos="fade-up" className="flex flex-col justify-center w-full">
        <div className="flex flex-row justify-center gap-5 font-semibold text-lg my-7 border-b border-black lg:max-w-[400px] lg:place-self-center">
          <div className="flex flex-col gap-y-1">
            <p
              onClick={changeProdArr}
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
              onClick={changeProdArr}
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
              onClick={changeProdArr}
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
      {!loadState && (
        <article
          data-aos="fade-up"
          className="grid grid-cols-1 gap-y-5 justify-center place-items-center sm:grid-cols-2 sm:gap-y-8 sm:gap-x-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
          {prodsArr.map((prod, index) => {
            return (
              <div
                key={index}
                className="h-[244px] w-[190px] bg-[#E8C3CB] border border-black z-0 relative sm:h-[300px] sm:w-[246px] md:h-[480px] md:w-[407px]"
              >
                <div className="absolute -right-2 -bottom-2 border border-black bg-white h-[244px] w-[190px] p-1 sm:h-[300px] sm:w-[246px] md:h-[480px] md:w-[407px] md:p-2">
                  <Image
                    src={prod.coverImg}
                    priority
                    alt="product"
                    className="w-full h-[138px] cursor-pointer sm:h-[185px] md:h-[305px] hover:scale-95 hover:rounded-md transition-all ease-in-out delay-100"
                    onClick={() => {
                      const curr = prod;

                      //set to sessionStorage
                      sessionStorage.setItem(
                        "currProduct",
                        JSON.stringify(curr)
                      );

                      //send ID to pathname
                      setProductId(prod.id);
                    }}
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
                      <h3 className="font-semibold md:text-3xl">{`N${prod.price.toLocaleString(
                        undefined,
                        { maximumFractionDigits: 2 }
                      )}`}</h3>
                      <p className="text-[10px] text-white bg-[#00A460] px-1 md:text-sm">
                        {prod.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center mt-0.5 md:mt-7">
                    <button
                      onClick={() => {
                        const curr = prod;

                        //set to sessionStorage
                        sessionStorage.setItem(
                          "currProduct",
                          JSON.stringify(curr)
                        );

                        //send ID to pathname
                        setProductId(prod.id);
                      }}
                      className="h-[25px] bg-[#2E2729] text-white text-sm text-center px-2 md:text-lg sm:h-[35px] sm:w-[115px] md:h-[55px] md:w-[188px] hover:bg-black transition-all ease-in-out delay-100"
                    >
                      Shop Now
                    </button>
                    <button
                      onClick={() => pushProductToCart(prod)}
                      className="h-[25px] bg-white text-[#2E2729] border-[#2E2729] border text-sm text-center px-2 font-semibold sm:h-[35px] sm:w-[115px] md:text-lg md:h-[55px] md:w-[188px] hover:bg-[#00A460] hover:text-white hover:border-none transition ease-in-out delay-100"
                    >
                      Add to Cart +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </article>
      )}
      {loadState && (
        <div className="h-screen p-5 flex gap-y-1 flex-col italic items-center justify-center">
          <LoadingState height="50" width="50" />
          <p>Getting products...</p>
        </div>
      )}
    </section>
  );
}
