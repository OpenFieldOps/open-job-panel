import PageContainer from "@/components/container/PageContainer";
import { Separator } from "@chakra-ui/react";

export default function Settings() {
  return (
    <PageContainer fullCard w={"full"} toolbar={{ title: "Settings" }}>
      <Separator my={4} />
    </PageContainer>
  );
}
