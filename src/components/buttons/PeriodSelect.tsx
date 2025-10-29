import { createListCollection, For, Portal, Select } from "@chakra-ui/react";
import usePeriod from "@/hooks/usePeriod";

export enum PeriodSelectIds {
  IncomeStatistics = 0,
}

type PeriodSelectProps = {
  id: PeriodSelectIds;
};

export default function PeriodSelectWithLocalStorage({
  id,
}: PeriodSelectProps) {
  const { period, setPeriod } = usePeriod(id);

  return (
    <Select.Root
      collection={periodsListCollection}
      value={[String(periodValueMap[period].value)]}
      onValueChange={({ value }) => {
        const newValue = Number(value[0]);
        setPeriod(newValue);
      }}
      size="sm"
      width="220px"
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select period" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <For each={periodsListCollection.items}>
              {(period) => (
                <Select.Item item={period} key={period.value}>
                  {period.label}
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

const PERIODS = [
  { label: "Last week", value: 7 },
  { label: "Last month", value: 30 },
  { label: "Last 2 month", value: 60 },
  { label: "Last 3 month", value: 90 },
];

const periodValueMap = PERIODS.reduce((acc, period) => {
  acc[period.value] = period;
  return acc;
}, {} as Record<number, { label: string; value: number }>);

const periodsListCollection = createListCollection({
  items: PERIODS,
  itemToString: (item) => item.label,
  itemToValue: (item) => String(item.value),
});
