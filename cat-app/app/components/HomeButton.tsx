"use client";
import { useCallback } from "react";
import Button from "./Button";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

type Props = {
  disabled: boolean
} 

function HomeButton({ disabled }: Props) {
const router = useRouter();
const onClick = () => {
    router.push('/home/')
}

  return (
    <Button
      label="Home"
      disabled={disabled}
      onClick={onClick}
    />
  );
}

export default HomeButton;