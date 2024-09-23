"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import Loading from "@/components/loading/loading";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { products } from "@/utils/Products";
import { Products } from "@/components/products/products";
import fullProdImg from "@/assets/images/product3-2.png";
import vector1 from "@/assets/icons/vector-1.png";
import { IoIosArrowRoundForward } from "react-icons/io";

export interface Products {
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

export interface newObject {
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
  quantity: number;
}

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

export default function Page() {

  const [getProductId, setGetProductId] = useState<number>();
  const [prod, setProd] = useState<Products>();
  const [count, setCount] = useState<number>(0);
  const [cartArr, setCartArr] = useState<Array<cartObjects>>([]);
  // console.log(cartArr);

  const [newObj, setNewObj] = useState<newObject>({
    id: 0,
    coverImg: fullProdImg,
    fullImg: fullProdImg,
    name: "",
    desc: "",
    about: "",
    price: 0,
    status: "",
    category: "",
    color: "",
    quantity: count
  });
  const router = useRouter();

  function getCartArr (){
    const cartItems = sessionStorage.getItem("cartItems");
    if(!cartItems){
      console.log("Cannot find cart in session storage");
      return;
    } else {
      const exisCartArr: object[] = JSON.parse(cartItems);
      // console.log(exisCartArr);
      setCartArr(exisCartArr);
      // console.log("existing cart array gotten and set to cartArr");
    }
  }

  function setCartToSessionStorage (cartItems: object[]){
    // const defaultCartArr: object[] = [];
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    // console.log("Cart Array Set");
  }

  function getProduct() {
    //first we get the session data
    //we check for data to not be null, undefined etc
    //If we have data, we parse it and put it into the array
    //we then push onto the array, which is either empty (no session data) or filled (Session data)
    //we finally set the session data back
    const selectedProduct = sessionStorage.getItem("currProduct");
    if (!selectedProduct) {
      // sessionStorage.setItem("currProduct", JSON.stringify([path]));
      console.log("empty storage");
      return;
    } else {
      // console.log("Found one!");
      const product = JSON.parse(selectedProduct);
      setProd(product);
    }
  }

  function setProductId(e: number) {
    // console.log(e);
    setGetProductId(e);
  }

  function setNewObject() {
    if (prod) {
      const currentProduct = prod;
      // console.log(prod);
      setNewObj({
        id: currentProduct.id,
        coverImg: currentProduct.coverImg,
        fullImg: currentProduct.fullImg,
        name: currentProduct.name,
        desc: currentProduct.desc,
        about: currentProduct.about,
        price: currentProduct.price,
        status: currentProduct.status,
        category: currentProduct.category,
        color: currentProduct.color,
        quantity: count + 1,
      });
      toast.success("Item added to cart");
    } else {
      return;
    }
  }

  //YOU'RE HERE
  // To search for an existing object id
  function findItemById (id:number | undefined): cartObjects | undefined {
    //find from existing cartArr if a selected product is already there.
    
    //find
    const item = cartArr?.find(item => item?.id === id);

    //if found, edit the properties
    if(item){
      item.quantity = count
    } else {
      return
    }
    return item;
  }

  useEffect(() => {
    if(count !== 0){
      //
      const result = findItemById(newObj?.id);
      console.log(result);
      if(result){
        console.log("Existing object has been updated")
      } else {
        setCartArr((prevState)=>{
          return [
            ...prevState,
            newObj
          ]
        })
        console.log("New object added");
      }
    } else {
      // console.log('Welcome to products page');
      return
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    getProduct();
    getCartArr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProductId]);

  useEffect(() => {
    if (getProductId === undefined) {
      return;
    } else {
      router.push(`/product/${getProductId.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProductId]);

  useEffect(()=>{
    if(cartArr.length !== 0 && count !== 0){
      // console.log(cartArr);
      setCartToSessionStorage(cartArr);
    } else {
      return;
    }
  }, [cartArr, count])

  return (
    <Layout>
      {/* Where the session storage object comes in */}
      {prod && (
        <section className="px-5 pt-5 pb-5 sm:pt-20 lg:mb-5">
          <div className="bg-[#E8C3CB] border border-black rounded-xl py-1 px-4 text-center sm:hidden">
            <p className="text-sm">
              We&apos;re giving 20% discount for our first 1,000 orders. Use
              Code <span className="font-bold">FIRST1K </span>to get the
              discount in your order.
            </p>
          </div>
          <div className="mt-5 mb-2">
            <h1 className="font-medium text-lg text-[#CF8292]">
              {" "}
              <Link className="hover:underline" href={"/"}>
                Home{" "}
              </Link>
              <span className="text-black">/</span>{" "}
              <span className="text-gray-400">Product</span>
            </h1>
          </div>
          <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-8 xl:gap-x-12">
            <div className="w-full sm:flex sm:justify-center lg:min-w-[400px] lg:h-[588px] xl:min-w-[565px] xl:h-auto">
              <Image
                className="w-full h-auto rounded-lg sm:w-[400px] lg:w-full"
                alt="product-img"
                priority
                src={fullProdImg}
              />
            </div>
            <div className="flex flex-col gap-y-4 lg:gap-y-5 lg:min-w-[500px] xl:min-w-[630px] xl:gap-y-12">
              <div className="hidden bg-[#E8C3CB] border border-black rounded-xl py-1 px-4 text-center sm:flex">
                <p className="text-sm">
                  We&apos;re giving 20% discount for our first 1,000 orders. Use
                  Code <span className="font-bold">FIRST1K </span>to get the
                  discount in your order.
                </p>
              </div>

              {/* object parsing begins */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-medium lg:text-4xl">
                    {prod?.name}
                  </h1>
                  <p className="text-lg">{prod?.desc}</p>
                </div>
                <div className="flex flex-col items-end">
                  <h1 className="text-3xl font-medium">{`N${prod.price.toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                  )}`}</h1>
                  <p className="text-sm bg-[#00A460] px-2 text-white">
                    {prod?.status}
                  </p>
                </div>
              </div>
              <p className="text-xl xl:text-2xl">{prod?.about}</p>

              {/* objects parsing ends */}
              <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <button
                  onClick={() => {
                    setCount(count + 1);
                    setNewObject();
                  }}
                  className="h-[55px] w-[140px] border border-[rgb(46,39,41)] font-semibold text-[#2E2729] hover:bg-[#41373a] hover:text-white transition delay-75 ease-in-out cursor-pointer lg:text-lg"
                >
                  Add to Cart{" "}
                  {count !== 0 && (
                    <span className="bg-[#41373a] rounded-md p-0.5 text-white">{`+${count}`}</span>
                  )}
                </button>
                {count !== 0 && (<Link
                  className="underline font-medium lg:text-lg"
                  href={"/cart"}
                >
                  Go to cart
                </Link>)}
              </div>
              {count !== 0 && (
                <div className="py-5 flex flex-row items-center gap-x-2">
                  <div className="flex flex-row gap-x-1 items-center">
                    <Image
                      src={vector1}
                      priority
                      alt="vector"
                      className="h-[30px] w-[34px]"
                    />
                    <p className="underline cursor-pointer text-sm font-medium lg:text-lg">
                      Pick another color choice
                    </p>
                  </div>
                  {/* <Image src={vector2} alt="vector" priority className="h-[32px]" /> */}
                  <span className=" border-none w-[1px] h-[32px] bg-black"></span>
                  <div className="flex flex-row gap-x-1 items-center">
                    <p className="text-sm font-medium lg:text-lg">
                      New chosen color
                    </p>
                    <i>
                      <IoIosArrowRoundForward />
                    </i>
                    <span className="bg-[#FB1CBF] h-[30px] w-[34px]"></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {!prod && <Loading />}
      <Products cartArray={cartArr} setCartArray={setCartArr} productsData={products} setProductId={setProductId} />
    </Layout>
  );
}
