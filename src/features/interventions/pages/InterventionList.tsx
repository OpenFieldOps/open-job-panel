import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import { IconButtonDialog } from "@/components/dialog/ButtonDialog";
import { Plus } from "lucide-react";
import InterventionCreateForm from "../components/InterventionCreateForm";
import useInterventionList from "../hooks/useInterventionList";
import Calendar from "@/components/block/Calendar/EventCalendar";
import { Flex, useDialog } from "@chakra-ui/react";
import { apiClient } from "@/lib/apiClient";

export default function InterventionList() {
  const { data } = useInterventionList();
  const dialogState = useDialog();
  const interventions = (data?.data || []).map((intervention, index) => ({
    start: intervention.startDate,
    end: intervention.endDate,
    extendedProps: { ...intervention, index },
  }));
  return (
    <PageContainer>
      <PageTitleWithToolbar
        title="Interventions"
        toolbar={
          <IconButtonDialog dialogState={dialogState} icon={<Plus />}>
            <InterventionCreateForm
              onCreated={() => dialogState.setOpen(false)}
            />
          </IconButtonDialog>
        }
      />
      <Flex maxH={"100%"} w={"100%"}>
        <Calendar
          onEventUpdate={(index, startDate, endDate) => {
            apiClient.intervention.patch({
              id: interventions[index].extendedProps.id,
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
            });
          }}
          events={interventions}
        />
      </Flex>
    </PageContainer>
  );
}
