import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import DashboardJobsBlock from "@/features/admin/components/Dashboard/DashboardJobsBlock";

export default function Dashboard() {
  return (
    <Box p={6}>
      <Heading mb={6}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        <DashboardJobsBlock />
      </SimpleGrid>
    </Box>
  );
}
