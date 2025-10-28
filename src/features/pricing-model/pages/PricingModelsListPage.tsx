import { Button, Card, useDialog, VStack } from "@chakra-ui/react";
import type { PricingModel } from "backend/modules/pricing-model/model";
import { useState } from "react";
import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import AddButton from "@/components/buttons/AddButton";
import { EmptyWrapperAction } from "@/components/container/EmptyWrapper";
import PageContainer from "@/components/container/PageContainer";
import ConfirmAlertDialog from "@/components/dialog/ConfirmAlertDialog";
import PricingModelCreateModal from "../components/PricingModelCreateModal";
import PricingModelEditModal from "../components/PricingModelEditModal";
import usePricingModelsList from "../hooks/usePricingModelsList";
import { deletePricingModel } from "../query";
import { EntityCard } from "@/components/block/EntityCard";

export default function PricingModelsListPage() {
  const dialog = useDialog();
  const [selectedModel, setSelectedModel] =
    useState<PricingModel.PricingModel | null>(null);

  const { data } = usePricingModelsList();

  return (
    <PageContainer>
      <PageTitleWithToolbar
        title="Pricing Models"
        toolbar={<PricingModelCreateModal trigger={<AddButton />} />}
      />
      {selectedModel && (
        <PricingModelEditModal model={selectedModel} dialog={dialog} />
      )}
      <VStack gap={4} w={"full"}>
        <EmptyWrapperAction
          list={data}
          title="No pricing models"
          description="Create your first pricing model"
          render={(item) => (
            <PricingModelCard
              key={item.id}
              model={item}
              onEdit={() => {
                setSelectedModel(item);
                dialog.setOpen(true);
              }}
            />
          )}
        >
          <PricingModelCreateModal
            trigger={<Button>Create Pricing Model</Button>}
          />
        </EmptyWrapperAction>
      </VStack>
    </PageContainer>
  );
}

type PricingModelCardProps = {
  model: PricingModel.PricingModel;
  onEdit: () => void;
};

function PricingModelCard({ model, onEdit }: PricingModelCardProps) {
  return (
    <EntityCard.Root>
      <EntityCard.Actions>
        <ConfirmAlertDialog
          title="Delete Pricing Model"
          description="Are you sure you want to delete this pricing model? This action cannot be undone."
          onConfirm={() => deletePricingModel(model.id)}
        >
          <EntityCard.DeleteButton />
        </ConfirmAlertDialog>
        <EntityCard.EditButton onClick={onEdit} />
      </EntityCard.Actions>
      <EntityCard.Content>
        <Card.Title>{model.name}</Card.Title>
        Base Rate: ${model.baseRate}/hr
      </EntityCard.Content>
    </EntityCard.Root>
  );
}
