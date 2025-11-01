import {
  Box,
  Combobox,
  Spinner,
  Text,
  useListCollection,
} from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  getAutoCompletionLocalisation,
  type LocationProperty,
} from "@/lib/apiLocation";

interface LocationSelectProps {
  value?: string;
  onChange: (address: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export default function LocationSelect({
  value = "",
  onChange,
  placeholder = "Search for an address...",
  isDisabled = false,
  isRequired = false,
}: LocationSelectProps) {
  const [inputValue, setInputValue] = useState(value);
  const [results, setResults] = useState<LocationProperty[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { collection, set } = useListCollection<LocationProperty>({
    initialItems: results,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.citycode,
  });

  useEffect(() => {
    set(results);
  }, [results, set]);

  const searchLocation = async (query: string) => {
    if (!query || query.length < 4) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getAutoCompletionLocalisation(query);
      setResults(data);
    } catch (error) {
      console.error("Location search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const { debouncedCallback: debouncedSearch } = useDebounce(
    searchLocation,
    300
  );

  const handleSelect = (details: { value: string[] }) => {
    if (!details.value || details.value.length === 0) {
      onChange("");
      return;
    }

    const citycode = details.value[0];
    const item = results.find((r) => r.citycode === citycode);

    if (!item) return;

    setInputValue(item.label);
    onChange(item.label);
  };

  return (
    <Combobox.Root
      openOnClick
      inputValue={inputValue}
      onInputValueChange={(details) => {
        if (details.reason === "input-change") {
          setInputValue(details.inputValue);
          debouncedSearch(details.inputValue);
          onChange(details.inputValue);
        }
      }}
      onSelect={handleSelect}
      collection={collection}
      disabled={isDisabled}
    >
      <Combobox.Control>
        <Combobox.Input
          placeholder={placeholder}
          required={isRequired}
          disabled={isDisabled}
        />
        <Combobox.IndicatorGroup>
          {isLoading && (
            <Box mr="2">
              <Spinner size="sm" />
            </Box>
          )}
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Combobox.Positioner>
        <Combobox.Content>
          {results.length > 0 ? (
            results.map((result) => (
              <Combobox.Item key={result.citycode} item={result}>
                <Box display="flex" alignItems="center" gap="2" width="full">
                  <MapPin size={16} />
                  <Text
                    flex="1"
                    fontSize="sm"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {result.label}
                  </Text>
                </Box>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))
          ) : inputValue.length >= 4 && !isLoading ? (
            <Combobox.Empty>
              <Text fontSize="sm" color="gray.500">
                No results found
              </Text>
            </Combobox.Empty>
          ) : inputValue.length > 0 && inputValue.length < 4 ? (
            <Combobox.Empty>
              <Text fontSize="sm" color="gray.500">
                Type at least 4 characters
              </Text>
            </Combobox.Empty>
          ) : (
            <Combobox.Empty>
              <Text fontSize="sm" color="gray.500">
                Start typing an address
              </Text>
            </Combobox.Empty>
          )}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}
