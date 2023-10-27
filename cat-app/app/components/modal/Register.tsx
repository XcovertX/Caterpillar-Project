"use client";
import useLogin from "@/app/hooks/LoginModal";
import useRegister from "@/app/hooks/RegisterModal";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../Input";
import Modal from "./Modal";
import Phone from "../Phone";
import Address from "../Address";
import Card from "../Card";
import Seperator from "../Seperator";

function Register() {
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [firstName, setFirstName]     = useState("");
  const [lastName, setLastName]       = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [shipCity, setShipCity]       = useState("");
  const [shipState, setShipState]     = useState("");
  const [shipCountry, setShipCountry] = useState("");
  const [billAdress, setBillAddress]  = useState("");
  const [billCity, setBillCity]       = useState("");
  const [billState, setBillState]     = useState("");
  const [billCountry, setBillCountry] = useState("");
  const [cardType, setCardType]       = useState("");
  const [cardNumber, setCardNumber]   = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading]     = useState(false);
  const useRegisterModal:any          = useRegister();
  const useLoginModal:any             = useLogin();

  const onToggle = useCallback(() => {
    useRegisterModal.onClose();
    useLoginModal.onOpen();
  }, [useRegisterModal, useLoginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
          shipAddress,
          shipCity,
          shipCountry,
          shipState,
          billAdress,
          billCity,
          billCountry,
          billState, 
          cardNumber,
          cardType
        }),
      });
      if (!response.ok) {
        throw new Error("Invalid response");
      }
      setIsLoading(false);
      toast.success("account has been created successfully");
      await signIn("credentials", {
        email,
        password,
      });
      useRegisterModal.onClose();
    } catch (error) {
      console.error("Account error: ", error);
    }
  }, [
    useRegisterModal, 
    email, 
    password, 
    firstName, 
    lastName,
    shipAddress,
    shipCity,
    shipCountry,
    shipState,
    billAdress,
    billCity,
    billCountry,
    billState,
    phoneNumber,
    cardNumber,
    cardType
    ]
  );

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Seperator label="personal information" color="border-neutral-500/[.7]" />
      <div className='flex flex-row gap-2'>
        <Input
          disabled={isLoading}
          placeholder="Fisrt Name"
          type="text"
          value={firstName}
          onChange={(e:any) => setFirstName(e.target.value)}
        />      
        <Input
          disabled={isLoading}
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e:any) => setLastName(e.target.value)}
        />
      </div>
      <Phone
        type="text"
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
      <Input
        disabled={isLoading}
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e:any) => setEmail(e.target.value)}
      />
      <Seperator label="shipping address" color="border-neutral-500/[.7]" />
      <Address 
        address={shipAddress}
        city={shipCity}
        state={shipState}
        country={shipCountry}
        setAddress={setShipAddress}
        setCity={setShipCity}
        setCountry={setShipCountry}
        setState={setShipState}
        addressType="Shipping"
       />
       <Seperator label="billing address" color="border-neutral-500/[.7]" />
      <Address 
        address={billAdress}
        city={billCity}
        state={billState}
        country={billCountry}
        setAddress={setBillAddress}
        setCity={setBillCity}
        setCountry={setBillCountry}
        setState={setBillState}
        addressType="Billing"
       />
       <Seperator label="card information" color="border-neutral-500/[.7]" />
      <Card 
        cardNumber={cardNumber}
        cardType={cardType}
        setNumber={setCardNumber}
        setType={setCardType}/>
        <Seperator label="password" color="border-neutral-500/[.7]" />
      <Input
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e:any) => setPassword(e.target.value)}
      />
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an Account?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:text-sky-500 hover:underline ml-2"
        >
          Sign In
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      title="Create your Account"
      actionLabel="Register"
      isOpen={useRegisterModal.isOpen}
      onClose={useRegisterModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default Register;