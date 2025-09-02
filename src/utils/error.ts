type ErrorType =
  | "required"
  | "minLength"
  | "maxLength"
  | "pattern"
  | "disabled"
  | "max"
  | "min"
  | "value"
  | "onChange"
  | "onBlur"
  | "validate"
  | "setValueAs"
  | "shouldUnregister"
  | "deps"
  | "valueAsNumber"
  | "valueAsDate";

const errorTypeMessageMap: Record<ErrorType, string> = {
  required: "This field is required.",
  minLength: "This field must be at least 3 characters long.",
  maxLength: "This field must be at most 255 characters long.",
  pattern: "This field does not match the required pattern.",
  disabled: "This field is disabled.",
  max: "This field must be less than or equal to the maximum value.",
  min: "This field must be greater than or equal to the minimum value.",
  value: "This field must be a valid value.",
  onChange: "An error occurred while changing the value.",
  onBlur: "An error occurred while blurring the field.",
  validate: "Validation failed.",
  setValueAs: "An error occurred while setting the value.",
  shouldUnregister: "This field should be unregistered.",
  deps: "Dependencies error.",
  valueAsNumber: "This field must be a number.",
  valueAsDate: "This field must be a valid date.",
};

export function errorTypeAsErrorMessage(errorType: string): string {
  return errorTypeMessageMap[errorType as ErrorType] || errorType;
}
