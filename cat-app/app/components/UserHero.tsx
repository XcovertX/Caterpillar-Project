import Image from "next/image"
import Avatar from "./Avatar"

type Props = {
    coverPic: string;
    profilePic: string;
    userId: string
}

function UserHero({coverPic, profilePic, userId}: Props) {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {coverPic && (
          <Image
            src={coverPic}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar
            profilePic={profilePic}
            userId={userId}
            isLarge
            hasBorder
          />
        </div>
      </div>
    </div>
  )
}

export default UserHero