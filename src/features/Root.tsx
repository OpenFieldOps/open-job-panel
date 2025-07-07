import NavBar from "@/components/block/NavBar";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function RootContainer() {
  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      w={"100vw"}
      maxW={"100vw"}
      maxH={"100vh"}
    >
      <NavBar />
      <Outlet />
    </Flex>
  );
}
