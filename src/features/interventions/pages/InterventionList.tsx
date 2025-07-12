import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import {
  DialogContent,
  IconButtonDialog,
} from "@/components/dialog/ButtonDialog";
import { Plus } from "lucide-react";
import InterventionCreateForm from "../components/InterventionCreateForm";
import useInterventionList, {
  type InterventionEventCalendar,
} from "../hooks/useInterventionList";
import Calendar from "@/components/block/Calendar/EventCalendar";
import { Flex, Heading, HStack, useDialog, VStack } from "@chakra-ui/react";
import { apiClient, apiQueryCacheListUpdate } from "@/lib/apiClient";
import { InterventionEditForm } from "../components/InterventionEditForm";
import { useState } from "react";
import type { InterventionModel } from "backend/modules/intervention/model";
import { QueryCacheKey } from "@/app/queryClient";
import { InterventionStatusBadge } from "../components/InterventionStatusBadge";

function ToolBar() {
  const dialogState = useDialog();

  return (
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
  );
}

function InterventionEvent({
  intervention,
}: {
  intervention: InterventionModel.Intervention;
}) {
  return (
    <VStack
      h={"full"}
      p={2}
      alignItems={"left"}
      justifyContent={"space-between"}
    >
      <Heading size={"sm"}>{intervention.title}</Heading>

      <HStack justifyContent={"right"}>
        <InterventionStatusBadge
          status={
            intervention.status as InterventionModel.InterventionStatusEnum
          }
        />
      </HStack>
    </VStack>
  );
}

function InterventionListCalendar() {
  const { interventions } = useInterventionList();

  const dialog = useDialog();

  const [interventionId, setInterventionId] = useState<number | null>(null);

  return (
    <>
      <Calendar
        onEventUpdate={(index, startDate, endDate) => {
          const start = startDate.toISOString();
          const end = endDate.toISOString();

          apiClient.intervention.patch({
            id: interventions[index].extendedProps.id,
            startDate: start,
            endDate: end,
          });

          apiQueryCacheListUpdate(
            QueryCacheKey.InterventionList,
            (oldData: InterventionEventCalendar[]) => {
              oldData[index].start = start;
              oldData[index].end = end;
              return oldData;
            }
          );
        }}
        renderEvent={(event: InterventionEventCalendar) => (
          <InterventionEvent intervention={event.extendedProps} />
        )}
        events={interventions}
        onEventClick={(event) => {
          dialog.setOpen(true);
          setInterventionId(event.extendedProps.id);
        }}
      />
      <DialogContent dialogState={dialog}>
        {interventionId && (
          <InterventionEditForm
            onSave={() => dialog.setOpen(false)}
            interventionId={interventionId}
          />
        )}
      </DialogContent>
    </>
  );
}

export default function InterventionListPage() {
  return (
    <PageContainer>
      <ToolBar />
      <Flex maxH={"100%"} w={"100%"}>
        <InterventionListCalendar />
      </Flex>
    </PageContainer>
  );
}
