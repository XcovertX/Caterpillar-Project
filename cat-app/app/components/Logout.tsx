"use client";
import { signOut } from "next-auth/react";
import { useCallback } from "react";
import Button from "./Button";

function Logout() {

const onClick = useCallback(async () => {
  try {
    await signOut();
  } catch (error) {
    console.error("Failed to logout:", error);
  }
}, []);

  return (
    <Button
      label="Logout"
      disabled={false}
      onClick={onClick}
    />
  );
}

export default Logout;