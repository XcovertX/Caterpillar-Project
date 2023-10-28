"use client";
import Button from "./Button";
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