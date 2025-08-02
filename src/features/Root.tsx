import { Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import NavBar from "@/components/block/NavBar/NavBar";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function RootContainer() {
  const isOnline = useOnlineStatus();

  return (
    <Flex
      direction={"column"}
      h={"100%"}
      w={"100%"}
      maxW={"100vw"}
      maxH={"100vh"}
    >
      <NavBar />
      {isOnline ? (
        <Outlet />
      ) : (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          h={"100%"}
          w={"100%"}
        >
          <Heading>You are currently offline.</Heading>
        </Flex>
      )}
    </Flex>
  );
}
