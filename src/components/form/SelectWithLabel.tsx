import { Combobox, useFilter, useListCollection } from "@chakra-ui/react";
import type { Entity } from "@/types/entity";
import { useEffect, type ReactNode } from "react";

type SelectProps<T extends Entity> = {
  items: T[];
  label?: ReactNode;
  onSelect: (id: string) => void;
  defaultValue?: string;
};

export function SelectWithLabel<T extends Entity>({
  items,
  label,
  onSelect,
  defaultValue,
}: SelectProps<T>) {
  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, set } = useListCollection<T>({
    initialItems: items,
    itemToString: (item) => item.name,
    itemToValue: (item) => String(item.id),
    filter: contains,
  });

  useEffect(() => {
    set(items);
  }, [items, set]);

  return (
    <Combobox.Root
      openOnClick
      defaultValue={defaultValue ? [defaultValue] : undefined}
      onSelect={(value) => onSelect(value.value[0])}
      collection={collection}
      width="320px"
    >
      {label && <Combobox.Label>{label}</Combobox.Label>}
      <Combobox.Control>
        <Combobox.Input
          placeholder="Type to search"
          defaultValue={
            items.find((item) => String(item.id) === defaultValue)?.name
          }
        />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No items found</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item item={item} key={item.id}>
              {item.name}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}
