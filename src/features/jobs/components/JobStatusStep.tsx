import { Button, ButtonGroup, Steps } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/JobModel";
import { CheckCircle, Clock, Loader2, SquareCheck } from "lucide-react";
import { useState } from "react";
import {
  jobStatusIndexMap,
  jobStatusInfo,
  jobStatusNotCompleted,
} from "../constant";

type JobStatusStepProps = {
  onChange?: (newStatus: JobModel.JobStatusString) => void;
  defaultStatus?: JobModel.JobStatusString;
};

const jobStatusIconMap: Record<JobModel.JobStatusString, React.ReactNode> = {
  scheduled: <Clock />,
  inProgress: <Loader2 />,
  pending: <SquareCheck />,
  completed: <CheckCircle />,
};

export function JobStatusStep({ onChange, defaultStatus }: JobStatusStepProps) {
  const [stepIndex, setStepIndex] = useState(
    jobStatusIndexMap[defaultStatus || jobStatusInfo[0].status]
  );

  return (
    <Steps.Root
      w={"full"}
      count={jobStatusInfo.length - 1}
      onStepChange={(newStep) => {
        if (onChange) {
          onChange(
            jobStatusInfo[newStep.step].status as JobModel.JobStatusString
          );
        }
        setStepIndex(newStep.step);
      }}
      step={stepIndex}
    >
      <Steps.List>
        {jobStatusNotCompleted.map((step, index) => (
          <Steps.Item index={index} key={step.status} title={step.title}>
            <Steps.Indicator>{jobStatusIconMap[step.status]}</Steps.Indicator>
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
      {onChange ? (
        <ButtonGroup size="sm" variant="outline">
          <Steps.PrevTrigger asChild>
            <Button>Previous</Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button>
              {stepIndex < jobStatusInfo.length - 2
                ? "Next"
                : stepIndex === jobStatusInfo.length - 1
                ? "Completed"
                : "Finish"}
            </Button>
          </Steps.NextTrigger>
        </ButtonGroup>
      ) : null}
    </Steps.Root>
  );
}
