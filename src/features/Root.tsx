import NavBar from "@/components/block/NavBar/NavBar";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function RootContainer() {
  return (
    <Flex
      direction={"column"}
      h={"100%"}
      w={"100%"}
      maxW={"100vw"}
      maxH={"100vh"}
    >
      <NavBar />
      <Outlet />
    </Flex>
  );
}
