"use client";
import { useCallback } from "react";
import Button from "./Button";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

type Props = {
  disabled: boolean
}

function CartButton({ disabled }: Props) {
const router = useRouter();
const onClick = () => {
    router.push('/cart/')
}

  return (
    <Button
      label="Cart"
      disabled={disabled}
      onClick={onClick}
    />
  );
}

export default CartButton;