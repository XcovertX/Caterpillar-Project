"use client";
import useLogin from "@/app/hooks/LoginModal";
import useRegister from "@/app/hooks/RegisterModal";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "./Modal";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const useRegisterModal:any = useRegister()
const useLoginModal:any    = useLogin()


const onToggle = useCallback(() => {
  useRegisterModal.onOpen()
  useLoginModal.onClose()
}, [useRegisterModal,useLoginModal ])
const onSubmit = useCallback(async () => {
  try {
    setIsLoading(true);
    const user = await signIn("credentials", {
      email,
      password,
    });
     
    setIsLoading(false);
    useLoginModal.onClose();

  } catch (error) {
    console.error("Account error: ", error);
  }
}, [useLoginModal, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Email Address"
        type="text" 
        value={email}
        onChange={(e:any) => setEmail(e.target.value)}
      />
       
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
      <p>Don't have an Account?
        
        <span onClick={onToggle}  className="text-white hover:text-sky-500 cursor-pointer hover:underline ml-2">
           Register
        </span>
      </p>
      
    </div>
  )
  return (
    <Modal
      disabled={false}
      title="Log in to your Account"
      actionLabel="Login"
      isOpen={useLoginModal.isOpen}
      onClose={useLoginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default Login;