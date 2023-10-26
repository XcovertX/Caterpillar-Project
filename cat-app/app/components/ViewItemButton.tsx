"use client";
import { useCallback } from "react";
import Button from "./Button";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { Product } from "../types/product";

type Props = {
  disabled: boolean,
  id:       bigint
}

function ViewItemButton({ disabled, id }: Props) {
const router = useRouter();
const onClick = () => {
  router.push(`/inventory/${id}`)
}

  return (
    <Button
      label="View Item"
      disabled={disabled}
      onClick={onClick}
    />
  );
}

export default ViewItemButton;