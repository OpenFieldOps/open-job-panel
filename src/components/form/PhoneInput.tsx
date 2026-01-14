import { Input, InputGroup, NativeSelect } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { COUNTRY_CODES } from "./countryData";

type PhoneInputValue = {
	countryCode: string;
	phoneNumber: string;
	isCustom: boolean;
};

type UsePhoneInputProps = {
	onChange?: (fullNumber: string) => void;
};

export function usePhoneInput({ onChange }: UsePhoneInputProps = {}) {
	const [value, SetValue] = useState<PhoneInputValue>({
		countryCode: "+33",
		phoneNumber: "",
		isCustom: false,
	});

	const setValue = useCallback(
		(val: PhoneInputValue | ((prev: PhoneInputValue) => PhoneInputValue)) => {
			SetValue((prev) => {
				const newValue = typeof val === "function" ? val(prev) : val;
				if (onChange) {
					onChange(newValue.countryCode + newValue.phoneNumber);
				}
				return newValue;
			});
		},
		[onChange],
	);

	const getFullNumber = useCallback(() => {
		return value.countryCode + value.phoneNumber;
	}, [value]);

	return {
		value,
		setValue,
		getFullNumber,
	};
}

type UsePhoneInputReturn = ReturnType<typeof usePhoneInput>;

export type PhoneInputProps = {
	value: UsePhoneInputReturn;
	placeholder?: string;
};

export default function PhoneInput({
	value,
	placeholder = "Phone number",
}: PhoneInputProps) {
	const { setValue } = value;
	const { countryCode, phoneNumber, isCustom } = value.value;

	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		if (selectedValue === "custom") {
			setValue((prev) => ({
				...prev,
				countryCode: "+",
				isCustom: true,
			}));
		} else {
			setValue((prev) => ({
				...prev,
				isCustom: false,
				countryCode: selectedValue,
			}));
		}
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, "");
		setValue((prev) => ({
			...prev,
			phoneNumber: value,
		}));
	};

	return (
		<InputGroup
			startAddonProps={{
				p: 0,
				display: "flex",
				justifyContent: "center",
			}}
			startAddon={
				isCustom ? (
					<Input
						placeholder="Code"
						value={countryCode}
						onChange={(e) =>
							setValue((prev) => ({
								...prev,
								countryCode: e.target.value,
							}))
						}
						type="text"
						maxW={"80px"}
						m={0}
					/>
				) : (
					<NativeSelect.Root p={0} m={0} maxW={"60px"}>
						<NativeSelect.Field
							border="none"
							h="full"
							p={0}
							textAlign={"center"}
							value={isCustom ? "custom" : countryCode}
							onChange={handleCountryChange}
						>
							{COUNTRY_CODES.map((item) => (
								<option key={item.code} value={item.code}>
									{item.code} {item.flag}
								</option>
							))}
						</NativeSelect.Field>
					</NativeSelect.Root>
				)
			}
		>
			<Input
				placeholder={placeholder}
				value={phoneNumber}
				onChange={handlePhoneChange}
				type="tel"
			/>
		</InputGroup>
	);
}
