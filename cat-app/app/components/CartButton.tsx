"use client";
import { useCallback } from "react";
import Button from "./Button";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

function CartButton() {
const router = useRouter();
const onClick = () => {
    router.push('/cart/')
}

  return (
    <Button
      label="Cart"
      disabled={false}
      onClick={onClick}
    />
  );
}

export default CartButton;