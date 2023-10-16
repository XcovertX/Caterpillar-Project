"use client";
import useLogin from "@/app/hooks/LoginModal";
import useRegister from "@/app/hooks/RegisterModal";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../Input";
import Modal from "./Modal";
import Phone from "../Phone";

function Register() {
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [fisrtname, setFirstName]     = useState("");
  const [lastname, setLastName]       = useState("");
  const [shipAdress, setShipAddress]  = useState("");
  const [shipCity, setShipCity]       = useState("");
  const [shipState, setShipState]     = useState("");
  const [shipCountry, setShipCountry] = useState("");
  const [billAdress, setBillAddress]  = useState("");
  const [billCity, setBillCity]       = useState("");
  const [billState, setBillState]     = useState("");
  const [billCountry, setBillCountry] = useState("");
  const [cardType, setCardType]       = useState("");
  const [cardNumber, setCardNumber]   = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [isLoading, setIsLoading]     = useState(false);
  const useRegisterModal              = useRegister();
  const useLoginModal                 = useLogin();

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
          fisrtname,
          lastname
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
      console.log("Account error:");
    } catch (error) {
      console.log("Account error:");
      console.error(error);
      // Handle the error here, show error message, etc.
    }
  }, [
    useRegisterModal, 
    email, 
    password, 
    fisrtname, 
    lastname,
    shipAdress,
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
    <div className="flex flex-col gap-4">
      <div className='flex flex-row gap-4'>
        <Input
          disabled={isLoading}
          placeholder="Fisrt Name"
          type="text"
          value={fisrtname}
          onChange={(e:any) => setFirstName(e.target.value)}
        />      
        <Input
          disabled={isLoading}
          placeholder="Last Name"
          type="text"
          value={lastname}
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
      {/* <Input
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={(e:any) => setName(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /> */}
      <Input
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an Account?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline ml-2"
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