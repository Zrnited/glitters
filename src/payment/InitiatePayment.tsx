"use client"
import { Dispatch, SetStateAction } from "react";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
/**
 * Interswitch
 * Remitta
 * Rave by flutterwave
 * VoguePay
 * Paystack
 */

interface Response {
    message: string;
    redirecturl: string;
    reference:string;
    status:string;
    trans:string;
    transaction:string;
    trxref:string;
}

export interface PaymentProps {
    address: string;
    name: string;
    phoneNumber: string;
    text: string,
    classname: string;
    email: string;
    amount: number;
    disabled: boolean;
    cartProducts: object[];
    setPaySuccess: Dispatch<SetStateAction<Response | undefined>>;
    setPayFailed: Dispatch<SetStateAction<boolean>>;
}

/**
 * reference response sample
 * {
 *  message: "Approved"
    redirecturl: "?trxref=1727381925023reference=1727381925023"
    reference:"1727381925023"
    status:"success"
    trans:"4215361462"
    transaction:"4215361462"
    trxref:"1727381925023"
 * }
 */

export default function InitiatePayment({ address, text, classname, name, phoneNumber, email, amount, disabled, setPaySuccess, setPayFailed, cartProducts }: PaymentProps){
    // const publicKey: string = process.env.PAYSTACK_TEST_PUBLICKEY
    const publicKey: string = "pk_test_915546746a5c8c4a3fb55799b3285a6ab6088c50"

    function onSuccess (reference: Response){
        setPaySuccess(reference);
        console.log(reference);
        toast.success(`Payment successful!. Product will be delivered to ${address}.`);
    }

    function onClose (){
        alert("Payment will not be recorded. Are you sure you want to close?");
        setPayFailed(true);
        console.log("Payment failed");
    }

    return (
        <PaystackButton
            reference={(new Date().getTime().toString())} 
            className={classname}
            publicKey={publicKey}
            onSuccess={(reference)=>onSuccess(reference)}
            onClose={onClose}
            text={text}
            email={email}
            amount={amount * 100}
            firstname={name}
            phone={phoneNumber}
            currency= "NGN"
            disabled={disabled}
        />
    )
}

