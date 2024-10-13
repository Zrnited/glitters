"use client";
import Layout from "@/components/layout";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import paymentInt from "@/assets/images/payment-verification.png";
import check from "@/assets/icons/check.png";
import { z } from "zod";
import dynamic from "next/dynamic";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface cartObject {
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

interface PaymentDetails {
  amount: number;
  phoneNumber: string;
  address: string;
  comment: string;
}

interface User {
  fullName: string;
  email: string;
  password: string;
}

interface FieldErrors {
  address?: Array<string>;
  number?: Array<string>;
  comment?: Array<string>;
}

interface Response {
  message: string;
  redirecturl: string;
  reference:string;
  status:string;
  trans:string;
  transaction:string;
  trxref:string;
}

const paymentSchema = z.object({
  address: z
    .string()
    .min(2, { message: "Address info empty or too short" })
    .max(500, { message: "Address info too long" })
    .refine((value) => /^[A-Za-z0-9\s,\.]+$/.test(value.trim() ?? ""), {
      message: "Invalid character",
    }),
  number: z
    .string()
    .min(11, { message: "Eleven digits required at least" })
    .refine((value) => /^[0-9]+$/.test(value ?? ""), {
      message: "Invalid entries",
    }),
  comments: z.string().optional(),
});

const InitiatePayment = dynamic(() => import("@/payment/InitiatePayment"), {
  ssr: false,
});

export default function Page() {
  const [cartProducts, setCartProducts] = useState<Array<cartObject>>([]);
  // console.log(cartProducts);
  const [qtyCount, setQtyCount] = useState<number>(0);
  // console.log(qtyCount);
  const [currprodid, setCurrProdId] = useState<number>();
  const [pay, setPay] = useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amount: 0,
    phoneNumber: "",
    address: "",
    comment: "",
  });

  // console.log(paymentDetails);
  const [paymentErr, setPaymentErr] = useState<FieldErrors>();
  // console.log(paymentErr);
  const [currUser, setCurrUser] = useState<User>({
    fullName: "",
    email: "",
    password: "",
  });
  const [paySuccess, setPaySuccess] = useState<Response>();
  const [payFailed, setPayFailed] = useState<boolean>(false);

  //everything orders
  const { getOrderArr, setOrders, setOrderToSessionStorage, setCartToSessionStorage, setCart, cart } = useAppContext();
  const router = useRouter();

  const itemsPrice: number[] = cartProducts.map(
    (item) => item.price * item.quantity
  );
  // console.log(itemsPrice);
  let sumofPrices = 0;
  for (let num of itemsPrice) {
    sumofPrices = sumofPrices + num;
  }
  // console.log(sumofPrices);

  function getCartArr() {
    const cartItems = sessionStorage.getItem("cartItems");
    if (!cartItems) {
      console.log("Cannot find cart in session storage");
      return;
    } else {
      const exisCartArr: cartObject[] = JSON.parse(cartItems);
      setCartProducts(exisCartArr);
      console.log("existing cart array gotten and set to cartArr");
    }
  }

  function increaseQty(e: cartObject) {
    //find
    const item = cartProducts?.find((item) => item?.id === e.id);
    setCurrProdId(e.id);

    // if found, edit the properties
    if (item) {
      setQtyCount(item.quantity + 1);
      // setCurrProdId(e.id);
      item.quantity = item.quantity + 1;
    } else {
      return;
    }
    return item;
  }

  function decreaseQty(e: cartObject) {
    //find
    const item = cartProducts?.find((item) => item?.id === e.id);
    setCurrProdId(e.id);

    // if found, edit the properties
    if (item) {
      setQtyCount(item.quantity - 1);
      // setCurrProdId(e.id);
      if (item.quantity === 1) {
        if (qtyCount === 1) {
          setQtyCount(1);
          return item.quantity === 1;
        } else {
          return;
        }
      } else {
        item.quantity = item.quantity - 1;
      }
    } else {
      return;
    }
    return item;
  }

  function getUser() {
    const user = sessionStorage.getItem("userDetails");
    if (user) {
      const userDetails = JSON.parse(user);
      setCurrUser(userDetails);
      console.log("user gotten and parsed");
    } else {
      console.log("No existing user found");
      return;
    }
  }

  function handleChange(e: any) {
    // const validatedFields = paymentSchema.safeParse({
    //   address: paymentDetails.address,
    //   number: paymentDetails.phoneNumber,
    //   comments: paymentDetails.comment,
    // });
    // const hasErrors = validatedFields.error?.flatten().fieldErrors;
    // if (hasErrors) setPaymentErr(hasErrors);
    // console.log(hasErrors);
    if (e.target) {
      setPaymentDetails({
        ...paymentDetails,
        [e.target.name]: e.target.value,
      });
    } else {
      return;
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const validatedFields = paymentSchema.safeParse({
      address: paymentDetails.address,
      number: paymentDetails.phoneNumber,
      comments: paymentDetails.comment,
    });
    if (!validatedFields.success) {
      //do something
      setPay(false);
      console.log("Errors in fields. Check Payment Error");
    } else {
      if (
        sumofPrices !== 0 &&
        currUser.fullName !== "" &&
        currUser.email !== ""
      ) {
        setPaymentDetails((prev) => {
          return {
            ...prev,
            amount: sumofPrices,
          };
        });
        const allFields = {
          email: currUser.email,
          amount: sumofPrices,
          firstname: currUser.fullName,
          phone: paymentDetails.phoneNumber,
          address: paymentDetails.address,
        };
        console.log(allFields);
        setPay(true);
      } else {
        toast.warn("Cart is empty. Cannot process payment.");
        console.log("Either price or user is missing!");
      }
    }
  }

  function clearCart (){
    const emptyCart: cartObject[] = [];
    setCart(emptyCart);
    setCartProducts(emptyCart);
    setCartToSessionStorage(emptyCart);
    toast.success("All items cleared");
  }

  useEffect(() => {
    getCartArr();
    getUser();
    getOrderArr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const validatedFields = paymentSchema.safeParse({
      address: paymentDetails.address,
      number: paymentDetails.phoneNumber,
      comments: paymentDetails.comment,
    });
    const hasErrors = validatedFields.error?.flatten().fieldErrors;

    // console.log(hasErrors);
    // console.log(validatedFields.success);

    if(!validatedFields.success){
      setPaymentErr(hasErrors)
    } else {
      setPaymentErr(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentDetails]);
  
  useEffect(()=>{
    console.log(paySuccess)
    console.log(typeof(paySuccess))
    if(paySuccess === undefined){
      return;
    } else {
      if(paySuccess.status === "success"){
        const emptyCart: object[] = [];
        setOrders(cartProducts);
        setCart(emptyCart);
        setCartToSessionStorage(emptyCart);
        setOrderToSessionStorage(cartProducts);
        router.push("/orders");
      } else {
        return;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paySuccess])

  return (
    <Layout>
      <section className="px-5 pt-20">
        <div className="py-3">
          <p className="font-medium">
            <Link className="text-[#CF8292]" href={"/cart"}>
              Store
            </Link>{" "}
            / <span>Cart</span>
          </p>
          <div className="flex flex-row justify-between items-center mt-4 md:w-[60%] lg:w-1/2 xl:w-[59%]">
            <h1 className="font-medium text-3xl">Cart Page</h1>
           {cartProducts.length !== 0 && (<button className="bg-red-500 py-1 px-5 rounded text-white hover:bg-red-600 transition ease-in-out delay-100" onClick={clearCart}>Clear all</button>)}
          </div>
        </div>

        {/* Cart section */}
        <div className="border border-[#2E2729] md:flex md:flex-row">
          {/* cart div */}
          {cartProducts.length !== 0 && (
            <div className="p-2 h-auto flex flex-col gap-y-2 md:w-3/4">
              {/* cart-item */}
              {cartProducts?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row items-center gap-2 border border-[#2E2729] p-2 lg:h-auto"
                  >
                    <Image
                      alt="cart-img"
                      priority
                      src={item.coverImg}
                      className="w-[112px] h-[112px] lg:w-[80px] lg:h-[80px]"
                    />
                    <div className="lg:flex lg:flex-row lg:gap-x-5 lg:items-center">
                      <div>
                        <h1 className="font-medium text-xl lg:text-2xl">
                          {item.name}
                        </h1>
                        <p className="text-sm lg:text-lg">{item.desc}</p>
                      </div>
                      <div className="lg:hidden">
                        <div className="flex flex-row gap-5 text-sm font-semibold">
                          <p>{`N${item.price.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}`}</p>
                          <p>{item.color}</p>
                        </div>
                        <div className="flex flex-row gap-x-1">
                          <button
                            onClick={() => increaseQty(item)}
                            className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]"
                          >
                            <BsChevronUp color="white" size={20} />
                          </button>

                          <span className="w-[48px] h-[38px] border border-[#2E2729] font-semibold text-lg flex justify-center items-center">
                            {currprodid !== item.id
                              ? `${item.quantity}`
                              : `${qtyCount}`}
                          </span>

                          <button
                            onClick={() => decreaseQty(item)}
                            className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]"
                          >
                            <BsChevronDown color="white" size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="hidden lg:flex lg:items-center lg:gap-x-3 lg:flex-col xl:ml-5 xl:flex-row">
                        <p className="text-lg font-semibold">{item.color}</p>
                        <div className="flex flex-row gap-x-2">
                          <span className="w-[48px] h-[38px] border border-[#2E2729] font-semibold text-lg flex justify-center items-center">
                            {item.quantity}
                          </span>

                          <button
                            className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]"
                            onClick={() => increaseQty(item)}
                          >
                            <BsChevronUp color="white" size={20} />
                          </button>

                          <button
                            className="bg-black text-white h-[38px] flex justify-center items-center w-[38px]"
                            onClick={() => decreaseQty(item)}
                          >
                            <BsChevronDown color="white" size={20} />
                          </button>
                        </div>
                        <p className="text-lg font-semibold">{`N${item.price.toLocaleString(
                          undefined,
                          { maximumFractionDigits: 2 }
                        )}`}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* cart item with color selection */}
              {/* <div className="flex flex-row items-center gap-2 border border-[#2E2729] p-2 lg:h-auto">
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
                  <div className="flex flex-row gap-5 text-sm font-semibold">
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
            </div> */}

              {/* sub total */}
              <div className="text-end">
                <h1 className="font-semibold text-xl lg:text-2xl">{`Subtotal: N${sumofPrices.toLocaleString(
                  undefined,
                  { maximumFractionDigits: 2 }
                )}.00`}</h1>
              </div>
            </div>
          )}

          {cartProducts.length === 0 && (
            <div className="p-2 flex flex-col items-center justify-center gap-y-2 h-screen md:w-3/4">
              <p className="font-semibold text-lg italic">Your cart is empty</p>
              <Link
                className="h-[50px] text-lg bg-[#2E2729] text-white w-[200px] rounded-sm flex items-center justify-center"
                href={"/"}
              >
                Shop now
              </Link>
            </div>
          )}

          {/* Order div */}
          <div className="md:border-l border-[#2E2729] md:w-1/2">
            <div className="md:w-full p-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
                <h2 className="text-2xl font-medium">Complete Order</h2>
                <div className="flex flex-col gap-2 lg:flex-row">
                  <div className="flex flex-col gap-y-1">
                    <label className="font-semibold">Delivery Address*</label>
                    <input
                      type="text"
                      className="h-[60px] border border-[#2E2729] px-5 focus:outline-none"
                      onChange={handleChange}
                      name="address"
                      placeholder="e.g. 2, Main Street, Agege, Lagos."
                    />
                    {/* <p className="text-sm text-red-600">Required*</p> */}
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label className="font-semibold">
                      WhatsApp/Contact Number*
                    </label>
                    <input
                      type="text"
                      className="h-[60px] border border-[#2E2729] px-5 focus:outline-none"
                      onChange={handleChange}
                      name="phoneNumber"
                      placeholder="e.g. 0902..."
                    />
                    {/* <p className="text-sm text-red-600">Required*</p> */}
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="font-semibold">
                    Other comments (If any)
                  </label>
                  <input
                    type="text"
                    className="h-[60px] border border-[#2E2729] px-5 focus:outline-none"
                    onChange={handleChange}
                    name="comment"
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  {!pay && (
                    <button
                      disabled={paymentErr !== undefined}
                      className="w-[188px] h-[50px] text-base bg-[#2E2729] text-white mt-2"
                    >
                      Register Order Info
                    </button>
                  )}
                  {pay && (
                    <InitiatePayment
                      name={currUser.fullName}
                      amount={paymentDetails.amount}
                      address={paymentDetails.address}
                      phoneNumber={paymentDetails.phoneNumber}
                      cartProducts={cartProducts}
                      email={currUser.email}
                      classname="w-[188px] h-[50px] text-lg bg-[#00A460] rounded text-white mt-2"
                      text="Proceed to payment"
                      disabled={paymentErr !== undefined}
                      setPaySuccess={setPaySuccess}
                      setPayFailed={setPayFailed}
                    />
                  )}
                  {pay && (<span className="flex flex-col gap-x-1 items-center sm:flex-row">
                    <p className="text-[#00A460] text-sm sm:text-base md:hidden lg:flex">Details gotten </p>
                    <Image src={check} alt="icon" priority className="w-[20px] h-[20px]" />
                  </span>)}
                </div>
              </form>

              {/* Paystack div */}
              <div className="h-fit relative flex flex-col gap-y-2 items-center justify-center italic border border-[#2E2729] mt-5">
                {/* <LoadingState height="50" width="50" /> */}
                {/* {!payFailed && (<p className="absolute text-sm text-center text-white w-[70%] sm:text-base sm:w-[90%]">Payment confirmation will appear here once processed.</p>)} */}
                {payFailed && (<p className="text-red-600 text-lg">Transaction Failed! Try again.</p>)}
                <Image src={paymentInt} alt="payment-icon" className="w-fit h-fit" />
              </div>
              <p className="font-semibold text-center mt-3">
                Payment Powered by Paystack
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
