import { Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { InterventionModel } from "backend/modules/intervention/model";
import {
  interventionStatusInfo,
  interventionStatusNotCompleted,
} from "../constant";

type InterventionStatusStepProps = {
  onChange: (newStatus: InterventionModel.InterventionStatusString) => void;
  status: InterventionModel.InterventionStatusString;
  interventionId: number;
};

export function InterventionStatusStep({
  status,
  onChange,
}: InterventionStatusStepProps) {
  const step = interventionStatusInfo.findIndex(
    (step) => step.status === status
  );

  return (
    <>
      <Steps.Root
        onStepChange={(newStep) =>
          onChange(
            interventionStatusInfo[newStep.step]
              .status as InterventionModel.InterventionStatusString
          )
        }
        count={interventionStatusInfo.length - 1}
        step={step}
      >
        <Steps.List>
          {interventionStatusNotCompleted.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
        <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
        {interventionStatusNotCompleted.map((step, index) => (
          <Steps.Content key={index} index={index}>
            {step.description}
          </Steps.Content>
        ))}
        <ButtonGroup size="sm" variant="outline">
          <Steps.PrevTrigger asChild>
            <Button>Previous</Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button>Next</Button>
          </Steps.NextTrigger>
        </ButtonGroup>
      </Steps.Root>
    </>
  );
}
