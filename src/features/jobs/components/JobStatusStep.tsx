import { Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { JobModel } from "backend/modules/job/model";
import { jobStatusInfo, jobStatusNotCompleted } from "../constant";

type JobStatusStepProps = {
  onChange: (newStatus: JobModel.JobStatusString) => void;
  status: JobModel.JobStatusString;
};

export function JobStatusStep({ status, onChange }: JobStatusStepProps) {
  const step = jobStatusInfo.findIndex((step) => step.status === status);

  return (
    <>
      <Steps.Root
        onStepChange={(newStep) =>
          onChange(
            jobStatusInfo[newStep.step].status as JobModel.JobStatusString
          )
        }
        count={jobStatusInfo.length - 1}
        step={step}
      >
        <Steps.List>
          {jobStatusNotCompleted.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
        <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
        {jobStatusNotCompleted.map((step, index) => (
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
