import { SimpleGrid } from "@chakra-ui/react";
import { Settings2 } from "lucide-react";
import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { OutlineIconButton } from "@/components/buttons/Button";
import PageContainer from "@/components/container/PageContainer";

type DashboardProps = PropsWithChildren;

export default function Dashboard({ children }: DashboardProps) {
  return (
    <PageContainer
      toolbar={{
        title: "Dashboard",
        toolbar: (
          <NavLink to={"/private/admin/dashboard-settings"}>
            <OutlineIconButton>
              <Settings2 />
            </OutlineIconButton>
          </NavLink>
        ),
      }}
    >
      <SimpleGrid w={"full"} columns={{ base: 1, md: 2 }} gap={4}>
        {children}
      </SimpleGrid>
    </PageContainer>
  );
}
