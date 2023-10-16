"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
    isLarge?: boolean;
    hasBorder?: boolean;
    userId?: string;
    profilePic?: string;
}

function Avatar({ isLarge, hasBorder, userId, profilePic }: Props) {
  const router = useRouter();
  const onClick = useCallback(
    (event: { stopPropagation: () => void; }) => {
      event.stopPropagation();
      const url = `/user/${userId}`;
      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`
    ${hasBorder ? "border-4 border-black" : ""}
    ${isLarge ? "h-32" : "h-12"}
    ${isLarge ? "w-32" : "w-12"}
    rounded-full 
    hover:opacity-90 
    transition 
    cursor-pointer
    relative
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        onClick={onClick}
        alt="Avatar"
        src={profilePic || "/image/profile.png"}
      />
    </div>
  );
}

export default Avatar;