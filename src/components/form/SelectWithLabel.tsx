import {
  Combobox,
  type InputProps,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { type ReactNode, useEffect, useRef } from "react";
import type { Entity } from "@/types/entity";

type SelectProps<T extends Entity> = {
  items: T[];
  label?: ReactNode;
  onSelect: (id: string | null) => void;
  defaultValue?: string;
  clearable?: boolean;
  inputProps?: InputProps;
};

export function SelectWithLabel<T extends Entity>({
  items,
  label,
  onSelect,
  defaultValue,
  clearable = true,
  inputProps = {},
}: SelectProps<T>) {
  const ref = useRef<HTMLInputElement>(null);
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
    >
      {label && <Combobox.Label>{label}</Combobox.Label>}
      <Combobox.Control>
        <Combobox.Input
          ref={ref}
          placeholder="Type to search"
          defaultValue={
            items.find((item) => String(item.id) === defaultValue)?.name
          }
          {...inputProps}
        />
        <Combobox.IndicatorGroup>
          {clearable && (
            <Combobox.ClearTrigger
              onClick={() => {
                onSelect(null);
                if (ref.current) {
                  ref.current.value = "";
                }
              }}
            />
          )}
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
