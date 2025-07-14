import { Button, ButtonGroup, Steps } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import { useMemo } from "react";
import { jobStatusInfo, jobStatusNotCompleted } from "../constant";

type JobStatusStepProps = {
  onChange: (newStatus: JobModel.JobStatusString) => void;
  defaultStatus?: JobModel.JobStatusString;
};

export function JobStatusStep({ onChange, defaultStatus }: JobStatusStepProps) {
  const defaultStepIndex = useMemo(() => {
    if (!defaultStatus) return 0;
    const index = jobStatusInfo.findIndex(
      (step) => step.status === defaultStatus
    );
    return index === -1 ? 0 : index;
  }, [defaultStatus]);
  return (
    <Steps.Root
      count={jobStatusInfo.length - 1}
      onStepChange={(newStep) =>
        onChange(jobStatusInfo[newStep.step].status as JobModel.JobStatusString)
      }
      defaultStep={defaultStepIndex}
    >
      <Steps.List>
        {jobStatusNotCompleted.map((step, index) => (
          <Steps.Item index={index} key={step.status} title={step.title}>
            <Steps.Indicator />
            <Steps.Title>{step.title}</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
      <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
      {jobStatusNotCompleted.map((step, index) => (
        <Steps.Content index={index} key={step.status}>
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
  );
}
