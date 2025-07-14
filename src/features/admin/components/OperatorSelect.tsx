import { Combobox, useFilter, useListCollection } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import useOperators from "../hooks/useOperators";

type OperatorSelectProps = {
  onChange?: (userId: number) => void;
  defaultValue?: number;
};

export default function OperatorSelect({
  onChange,
  defaultValue,
}: OperatorSelectProps) {
  const { contains } = useFilter({ sensitivity: "base" });
  const { operators } = useOperators();

  const { collection, filter, set } = useListCollection({
    initialItems: operators,
    filter: contains,
    itemToString: (item) => item.firstName,
    itemToValue: (item) => item.id.toString(),
  });

  useEffect(() => {
    set(operators);
  }, [operators, set]);

  const defaultOperatorFirstName = useMemo(() => {
    return operators.find((item) => item.id === defaultValue)?.firstName;
  }, [operators, defaultValue]);

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => {
        if (e.inputValue.length <= 2) {
          return;
        }
        const id = operators.find(
          (item) => item.firstName === e.inputValue
        )?.id;
        if (id && onChange) {
          onChange(id);
        }
        filter(e.inputValue);
      }}
    >
      <Combobox.Control>
        <Combobox.Input
          placeholder="Type to search"
          defaultValue={defaultOperatorFirstName}
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
              {item.firstName}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}
