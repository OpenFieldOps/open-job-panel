import { Avatar, type AvatarRootProps } from "@chakra-ui/react";
import { useUserAuth } from "@/atoms/userAtom";

type UserAvatarProps = AvatarRootProps & {
  userInfo: {
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
};

export function UserAvatar({ userInfo, ...props }: UserAvatarProps) {
  const { firstName, lastName, avatar } = userInfo;
  return (
    <Avatar.Root cursor={"pointer"} {...props}>
      <Avatar.Fallback name={`${firstName} ${lastName}`} />
      <Avatar.Image src={avatar || undefined} />
    </Avatar.Root>
  );
}

export function CurrentUserAvatar(props: AvatarRootProps) {
  const userInfo = useUserAuth();

  return <UserAvatar {...props} userInfo={userInfo} />;
}
