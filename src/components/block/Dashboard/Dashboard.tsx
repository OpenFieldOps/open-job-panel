import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import DashboardJobsBlock from "@/features/admin/components/Dashboard/DashboardJobsBlock";

export default function Dashboard() {
  return (
    <Box p={6} w={"full"}>
      <Heading mb={6}>Dashboard</Heading>
      <SimpleGrid w={"full"} columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        <DashboardJobsBlock
          title="Jobs in progress"
          query={{
            status: "in_progress",
          }}
        />
        <DashboardJobsBlock
          title="Jobs in pending"
          query={{
            status: "pending",
          }}
        />
      </SimpleGrid>
    </Box>
  );
}
