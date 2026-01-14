import { FieldWithLabel } from "./FieldWithLabel";
import type { PhoneInputProps } from "./PhoneInput";
import PhoneInput from "./PhoneInput";

type PhoneInputWithLabelProps = PhoneInputProps & {
	label: string;
	error?: string;
};

export default function PhoneInputWithLabel({
	label,
	error,
	...props
}: PhoneInputWithLabelProps) {
	return (
		<FieldWithLabel label={label} error={error}>
			<PhoneInput {...props} />
		</FieldWithLabel>
	);
}
