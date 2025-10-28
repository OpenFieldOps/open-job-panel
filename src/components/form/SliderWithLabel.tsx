import { HStack, Slider, type SliderRootProps } from "@chakra-ui/react";

type SliderWithLabelProps = {
  label: string;
} & SliderRootProps;

export default function SliderWithLabel({
  label,
  ...sliderProps
}: SliderWithLabelProps) {
  return (
    <Slider.Root {...sliderProps}>
      <HStack justify="space-between">
        <Slider.Label>{label}</Slider.Label>
        <Slider.ValueText />
      </HStack>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  );
}
